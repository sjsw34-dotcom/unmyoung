/**
 * 운명테라피 사주 분석 주문 정보 수집
 *
 * 사용 방법:
 * 1. 구글 시트를 생성하고 "주문" 시트 탭 생성
 * 2. 확장 프로그램 > Apps Script 메뉴 클릭
 * 3. 이 코드를 붙여넣기
 * 4. 배포 > 새 배포 > 유형: 웹 앱 선택
 * 5. 액세스 권한: "모든 사용자" 선택
 * 6. 배포 후 웹 앱 URL 복사
 * 7. Vercel 환경 변수에 NEXT_PUBLIC_GOOGLE_SHEET_URL로 설정
 */

function doPost(e) {
  try {
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 스프레드시트 및 시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('주문');

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: '주문 시트를 찾을 수 없습니다.' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0) {
      createHeaders(sheet);
    }

    // 분석 인원 수
    const personCount = data.personCount || 1;

    if (personCount === 1) {
      // 1인 분석: 각 셀마다 번호 부여
      addSinglePersonOrder(sheet, data);
    } else {
      // 다인 분석: 하나의 행에 모든 정보 이어서 기록
      addMultiPersonOrder(sheet, data);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: '주문 정보가 저장되었습니다.' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('오류 발생: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 헤더 생성 (1인 분석 기준)
 */
function createHeaders(sheet) {
  const headers = [
    '번호',
    '주문일시',
    '주문ID',
    '패키지',
    '결제금액',
    '분석인원',
    '이름',
    '생년월일',
    '양력/음력',
    '생시',
    '성별',
    '이메일',
    '결제상태',
    '처리상태',
    '비고'
  ];

  sheet.appendRow(headers);

  // 헤더 스타일링
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');

  // 열 너비 자동 조정
  for (let i = 1; i <= headers.length; i++) {
    sheet.setColumnWidth(i, 120);
  }
}

/**
 * 1인 분석 주문 추가
 */
function addSinglePersonOrder(sheet, data) {
  const lastRow = sheet.getLastRow();
  const orderNumber = lastRow; // 헤더 제외한 순번

  const person = data.personsData[0];
  const timestamp = new Date();

  const row = [
    orderNumber,                           // 번호
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'), // 주문일시
    data.orderId || '',                    // 주문ID
    data.packageName || '',                // 패키지
    data.amount || '',                     // 결제금액
    1,                                     // 분석인원
    person.name || '',                     // 이름
    person.birthDate || '',                // 생년월일
    getCalendarTypeText(person.calendarType), // 양력/음력
    person.birthTime || '',                // 생시
    getGenderText(person.gender),          // 성별
    person.email || '',                    // 이메일
    '결제완료',                            // 결제상태
    '대기중',                              // 처리상태
    ''                                     // 비고
  ];

  sheet.appendRow(row);

  // 방금 추가된 행에 스타일 적용
  const newRow = sheet.getLastRow();
  const range = sheet.getRange(newRow, 1, 1, row.length);

  // 번호 열 하이라이트
  sheet.getRange(newRow, 1).setBackground('#e8f0fe');

  // 테두리 추가
  range.setBorder(true, true, true, true, true, true);

  // 가운데 정렬 (일부 열)
  sheet.getRange(newRow, 1, 1, 6).setHorizontalAlignment('center');
}

/**
 * 다인 분석 주문 추가
 * 1인은 한 행에, 2인 이상은 첫 번째 사람은 한 행에, 나머지는 하위 행(1-1, 1-2)에 저장
 */
function addMultiPersonOrder(sheet, data) {
  const lastRow = sheet.getLastRow();
  const baseOrderNumber = lastRow; // 헤더 제외한 순번 (첫 번째 사람의 번호)

  const timestamp = new Date();
  const personCount = data.personCount || data.personsData.length;

  // 첫 번째 사람 정보 (메인 행)
  const firstPerson = data.personsData[0];
  const firstRow = [
    baseOrderNumber,                      // 번호 (예: 1)
    Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'), // 주문일시
    data.orderId || '',                   // 주문ID
    data.packageName || '',               // 패키지
    data.amount || '',                    // 결제금액
    personCount,                          // 분석인원
    firstPerson.name || '',                // 이름
    firstPerson.birthDate || '',           // 생년월일
    getCalendarTypeText(firstPerson.calendarType), // 양력/음력
    firstPerson.birthTime || '',          // 생시
    getGenderText(firstPerson.gender),    // 성별
    firstPerson.email || '',              // 이메일
    '결제완료',                           // 결제상태
    '대기중',                             // 처리상태
    ''                                    // 비고
  ];

  sheet.appendRow(firstRow);
  const firstRowNum = sheet.getLastRow();

  // 첫 번째 행 스타일 적용
  const firstRange = sheet.getRange(firstRowNum, 1, 1, firstRow.length);
  sheet.getRange(firstRowNum, 1).setBackground('#e8f0fe');
  firstRange.setBorder(true, true, true, true, true, true);
  sheet.getRange(firstRowNum, 1, 1, 6).setHorizontalAlignment('center');

  // 두 번째 사람부터 하위 행으로 추가 (1-1, 1-2 형식)
  for (let i = 1; i < personCount; i++) {
    const person = data.personsData[i];
    const subOrderNumber = `${baseOrderNumber}-${i}`; // 예: 1-1, 1-2

    const subRow = [
      subOrderNumber,                     // 번호 (예: 1-1, 1-2)
      '',                                  // 주문일시 (첫 번째와 동일하므로 비움)
      '',                                  // 주문ID (첫 번째와 동일하므로 비움)
      '',                                  // 패키지 (첫 번째와 동일하므로 비움)
      '',                                  // 결제금액 (첫 번째와 동일하므로 비움)
      '',                                  // 분석인원 (첫 번째와 동일하므로 비움)
      person.name || '',                   // 이름
      person.birthDate || '',              // 생년월일
      getCalendarTypeText(person.calendarType), // 양력/음력
      person.birthTime || '',              // 생시
      getGenderText(person.gender),        // 성별
      person.email || '',                  // 이메일
      '',                                  // 결제상태 (첫 번째와 동일하므로 비움)
      '',                                  // 처리상태 (첫 번째와 동일하므로 비움)
      ''                                   // 비고
    ];

    sheet.appendRow(subRow);
    const subRowNum = sheet.getLastRow();

    // 하위 행 스타일 적용
    const subRange = sheet.getRange(subRowNum, 1, 1, subRow.length);
    sheet.getRange(subRowNum, 1).setBackground('#fff3cd'); // 노란색으로 구분
    subRange.setBorder(true, true, true, true, true, true);
    sheet.getRange(subRowNum, 1).setHorizontalAlignment('center');
    
    // 하위 행의 이름~이메일 열에 배경색 적용 (구분을 위해)
    const colors = ['#d1ecf1', '#d4edda', '#f8d7da'];
    sheet.getRange(subRowNum, 7, 1, 6).setBackground(colors[(i - 1) % colors.length]);
  }
}

/**
 * 달력 타입 텍스트 변환
 */
function getCalendarTypeText(type) {
  const types = {
    'solar': '양력',
    'lunar': '음력',
    'leap': '윤달'
  };
  return types[type] || type || '';
}

/**
 * 성별 텍스트 변환
 */
function getGenderText(gender) {
  const genders = {
    'male': '남성',
    'female': '여성'
  };
  return genders[gender] || gender || '';
}

/**
 * GET 요청 처리 (테스트용)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: '운명테라피 구글 시트 API가 정상 작동 중입니다.',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 수동 테스트 함수
 */
function testAddOrder() {
  const testData = {
    orderId: 'ORDER_TEST_123',
    packageName: '프리미엄 종합 분석',
    amount: 39000,
    personCount: 2,
    personsData: [
      {
        name: '홍길동',
        birthDate: '1990-01-01',
        calendarType: 'solar',
        birthTime: '오시 (11:30-13:30)',
        gender: 'male',
        email: 'test1@example.com'
      },
      {
        name: '김영희',
        birthDate: '1992-03-15',
        calendarType: 'lunar',
        birthTime: '자시 (23:30-01:30)',
        gender: 'female',
        email: 'test2@example.com'
      }
    ]
  };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('주문');

  if (!sheet) {
    Logger.log('주문 시트를 찾을 수 없습니다.');
    return;
  }

  if (sheet.getLastRow() === 0) {
    createHeaders(sheet);
  }

  // 테스트 데이터를 3명으로 변경하여 하위 행 테스트
  testData.personCount = 3;
  testData.personsData.push({
    name: '이철수',
    birthDate: '1988-05-20',
    calendarType: 'solar',
    birthTime: '인시 (03:30-05:30)',
    gender: 'male',
    email: 'test3@example.com'
  });

  addMultiPersonOrder(sheet, testData);
  Logger.log('테스트 데이터 추가 완료 (3명 테스트)');
}
