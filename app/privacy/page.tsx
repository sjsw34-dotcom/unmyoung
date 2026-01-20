// app/privacy/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 운명테라피",
  description: "운명테라피 개인정보처리방침",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#07080b] via-[#0f1014] to-[#07080b] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f1014]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:text-[#d4af37] transition-colors">
            운명테라피
          </Link>
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          개인정보처리방침
        </h1>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 space-y-8">
          {/* 서문 */}
          <section>
            <p className="text-white/80 leading-relaxed">
              운명테라피(이하 "회사")는 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등
              관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련된 고충을 신속하고 원활하게 처리할 수 있도록
              다음과 같이 개인정보처리방침을 수립·공개합니다.
            </p>
          </section>

          {/* 제1조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제1조 (개인정보의 수집 항목 및 수집 방법)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. 수집하는 개인정보 항목</h3>
                <p className="mb-2">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:</p>
                <div className="ml-4 space-y-3">
                  <div>
                    <p className="font-semibold text-white">① 필수 항목</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                      <li>이름</li>
                      <li>생년월일 (양력/음력/윤달 여부 포함)</li>
                      <li>출생 시간 (12지 시간대)</li>
                      <li>성별</li>
                      <li>이메일 주소</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-white">② 결제 정보 (자동 수집)</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                      <li>결제 수단 정보 (카드사명, 결제 승인번호 등)</li>
                      <li>주문번호 및 결제 금액</li>
                      <li>결제 일시</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-white">③ 서비스 이용 과정에서 자동 수집되는 정보</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                      <li>IP 주소, 쿠키, 방문 일시</li>
                      <li>서비스 이용 기록, 불량 이용 기록</li>
                      <li>기기 정보 (브라우저 종류, OS 버전 등)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. 개인정보 수집 방법</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>웹사이트 주문 양식을 통한 직접 입력</li>
                  <li>결제 시스템(토스페이먼츠)을 통한 결제 정보 수집</li>
                  <li>카카오톡 채널을 통한 문의 시 수집</li>
                  <li>서비스 이용 과정에서 자동 생성·수집</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제2조 (개인정보의 수집 및 이용 목적)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다:</p>
              <div className="ml-4 space-y-3">
                <div>
                  <p className="font-semibold text-white">① 서비스 제공</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                    <li>사주팔자 명리 분석 수행</li>
                    <li>맞춤형 분석 리포트 작성 및 제공</li>
                    <li>이메일을 통한 PDF 리포트 발송</li>
                    <li>서비스 이용 관련 안내 및 공지사항 전달</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">② 결제 및 정산</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                    <li>결제 처리 및 환불 처리</li>
                    <li>주문 확인 및 결제 영수증 발행</li>
                    <li>요금 정산 및 채권추심</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">③ 고객 지원</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                    <li>문의사항 응대 및 상담</li>
                    <li>불만 처리 및 분쟁 해결</li>
                    <li>서비스 개선 및 품질 향상</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">④ 마케팅 및 광고 (선택적 동의 시)</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                    <li>신규 서비스 안내 및 이벤트 정보 제공</li>
                    <li>맞춤형 서비스 추천</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">⑤ 서비스 운영 및 관리</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                    <li>부정 이용 방지 및 보안 강화</li>
                    <li>서비스 이용 통계 및 분석</li>
                    <li>법령 및 이용약관 위반 시 조치</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제3조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제3조 (개인정보의 보유 및 이용 기간)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다:
              </p>
              <div className="ml-4 space-y-3">
                <div>
                  <p className="font-semibold text-white">① 회사 내부 방침에 의한 정보 보유</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                    <li>서비스 이용 기록: 서비스 제공 완료 후 1년</li>
                    <li>고객 상담 기록: 상담 완료 후 3년</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">② 관련 법령에 의한 정보 보유</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                    <li>
                      <strong>계약 또는 청약철회 등에 관한 기록</strong>
                      <br />
                      <span className="text-sm">- 보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</span>
                      <br />
                      <span className="text-sm">- 보존 기간: 5년</span>
                    </li>
                    <li>
                      <strong>대금결제 및 재화 등의 공급에 관한 기록</strong>
                      <br />
                      <span className="text-sm">- 보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</span>
                      <br />
                      <span className="text-sm">- 보존 기간: 5년</span>
                    </li>
                    <li>
                      <strong>소비자 불만 또는 분쟁처리에 관한 기록</strong>
                      <br />
                      <span className="text-sm">- 보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</span>
                      <br />
                      <span className="text-sm">- 보존 기간: 3년</span>
                    </li>
                    <li>
                      <strong>표시·광고에 관한 기록</strong>
                      <br />
                      <span className="text-sm">- 보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</span>
                      <br />
                      <span className="text-sm">- 보존 기간: 6개월</span>
                    </li>
                    <li>
                      <strong>전자금융거래에 관한 기록</strong>
                      <br />
                      <span className="text-sm">- 보존 이유: 전자금융거래법</span>
                      <br />
                      <span className="text-sm">- 보존 기간: 5년</span>
                    </li>
                    <li>
                      <strong>방문 기록 (로그 기록, 접속 IP 정보)</strong>
                      <br />
                      <span className="text-sm">- 보존 이유: 통신비밀보호법</span>
                      <br />
                      <span className="text-sm">- 보존 기간: 3개월</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                다만, 다음의 경우에는 예외로 합니다:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                <li>서비스 제공을 위해 필요한 경우 (아래 위탁 업체 참조)</li>
              </ul>
              <div className="mt-4 p-4 bg-white/5 border border-white/20 rounded-lg">
                <p className="font-semibold text-white mb-2">개인정보 처리 위탁</p>
                <p className="mb-2">회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>
                    <strong>수탁업체:</strong> 토스페이먼츠(주)
                    <br />
                    <strong>위탁업무 내용:</strong> 결제 처리 및 결제 정보 관리
                  </li>
                  <li>
                    <strong>수탁업체:</strong> Supabase Inc.
                    <br />
                    <strong>위탁업무 내용:</strong> 데이터베이스 관리 및 저장
                  </li>
                  <li>
                    <strong>수탁업체:</strong> 이메일 발송 서비스 (구체적 업체명 기재 필요)
                    <br />
                    <strong>위탁업무 내용:</strong> 리포트 이메일 발송
                  </li>
                </ul>
                <p className="mt-3 text-sm">
                  회사는 위탁계약 체결 시 개인정보보호법에 따라 위탁업무 수행목적 외 개인정보 처리 금지,
                  기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을
                  계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 제5조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제5조 (이용자의 권리와 행사 방법)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>개인정보 열람 요구</li>
                <li>개인정보에 오류가 있는 경우 정정 요구</li>
                <li>개인정보 삭제 요구</li>
                <li>개인정보 처리 정지 요구</li>
              </ul>
              <p className="mt-4">
                위 권리 행사는 회사에 대해 서면, 전화, 이메일, 카카오톡 채널 등을 통하여 하실 수 있으며,
                회사는 이에 대해 지체 없이 조치하겠습니다.
              </p>
              <p>
                이용자가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다.
              </p>
              <p>
                만 14세 미만 아동의 경우, 법정대리인이 아동의 개인정보를 조회하거나 수정·삭제할 권리를 가집니다.
              </p>
            </div>
          </section>

          {/* 제6조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제6조 (개인정보의 파기 절차 및 방법)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. 파기 절차</h3>
                <p>
                  이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및
                  기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. 파기 방법</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>전자적 파일 형태: 복구 및 재생이 불가능한 기술적 방법을 사용하여 완전히 삭제</li>
                  <li>종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 제7조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제7조 (개인정보 보호를 위한 기술적·관리적 대책)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. 기술적 대책</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>개인정보는 암호화되어 저장 및 관리됩니다</li>
                  <li>해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위해 보안프로그램을 설치하고 주기적으로 갱신·점검</li>
                  <li>외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단</li>
                  <li>SSL(Secure Socket Layer) 암호화 통신을 사용하여 네트워크상에서 개인정보를 안전하게 전송</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. 관리적 대책</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>개인정보 취급 직원을 최소한으로 제한</li>
                  <li>개인정보 취급 직원에 대한 정기적인 교육 실시</li>
                  <li>개인정보 처리 시스템 접속 기록 보관 및 위·변조 방지</li>
                  <li>개인정보에 대한 접근 권한을 차등 부여</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 제8조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제8조 (쿠키의 운영 및 거부)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                회사는 이용자에게 개인화되고 맞춤화된 서비스를 제공하기 위해 쿠키(Cookie)를 사용합니다.
              </p>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. 쿠키란?</h3>
                <p>
                  쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 작은 텍스트 파일로,
                  이용자의 컴퓨터 하드디스크에 저장됩니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. 쿠키의 사용 목적</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>방문 및 이용 형태, 인기 검색어, 보안 접속 여부 등을 파악하여 맞춤형 서비스 제공</li>
                  <li>서비스 개선 및 추천을 위한 통계 분석</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. 쿠키 설정 거부 방법</h3>
                <p className="mb-2">이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                  <li>Chrome: 설정 {'>'} 개인정보 및 보안 {'>'} 쿠키 및 기타 사이트 데이터</li>
                  <li>Safari: 환경설정 {'>'} 개인정보 {'>'} 쿠키 및 웹사이트 데이터</li>
                  <li>Firefox: 옵션 {'>'} 개인정보 보호 {'>'} 쿠키 및 사이트 데이터</li>
                </ul>
                <p className="mt-2 text-sm">
                  ※ 쿠키 설치를 거부할 경우 서비스 이용에 어려움이 있을 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 제9조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제9조 (개인정보 보호책임자)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및
                피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="p-4 bg-white/5 border border-white/20 rounded-lg space-y-2">
                <p><strong className="text-white">개인정보 보호책임자</strong></p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li><strong>성명:</strong> [개인정보 보호책임자 이름]</li>
                  <li><strong>직책:</strong> [직책명]</li>
                  <li><strong>연락처:</strong> [전화번호]</li>
                  <li><strong>이메일:</strong> [이메일 주소]</li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                  <p className="text-yellow-300 text-sm">
                    ⚠️ 주의: 위 정보는 플레이스홀더입니다. 실제 개인정보 보호책임자 정보로 반드시 교체해야 합니다.
                  </p>
                </div>
              </div>
              <p className="mt-4">
                이용자는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에
                관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다.
                회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
              </p>
            </div>
          </section>

          {/* 제10조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제10조 (개인정보 열람청구)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                이용자는 개인정보보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.
                회사는 이용자의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
              </p>
              <div className="p-4 bg-white/5 border border-white/20 rounded-lg">
                <p><strong className="text-white">개인정보 열람청구 접수·처리 부서</strong></p>
                <ul className="ml-4 space-y-1 text-sm mt-2">
                  <li><strong>부서명:</strong> 운영팀</li>
                  <li><strong>연락처:</strong> 카카오톡 채널 (http://pf.kakao.com/_fECQn)</li>
                  <li><strong>이메일:</strong> [이메일 주소를 입력하세요]</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 제11조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제11조 (권익침해 구제방법)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                이용자는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원
                개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.
              </p>
              <ul className="ml-4 space-y-2">
                <li>
                  <strong className="text-white">개인정보분쟁조정위원회</strong>
                  <br />
                  <span className="text-sm">- 전화: 1833-6972</span>
                  <br />
                  <span className="text-sm">- 홈페이지: www.kopico.go.kr</span>
                </li>
                <li>
                  <strong className="text-white">개인정보침해신고센터 (한국인터넷진흥원 운영)</strong>
                  <br />
                  <span className="text-sm">- 전화: 국번없이 118</span>
                  <br />
                  <span className="text-sm">- 홈페이지: privacy.kisa.or.kr</span>
                </li>
                <li>
                  <strong className="text-white">대검찰청 사이버수사과</strong>
                  <br />
                  <span className="text-sm">- 전화: 국번없이 1301</span>
                  <br />
                  <span className="text-sm">- 홈페이지: www.spo.go.kr</span>
                </li>
                <li>
                  <strong className="text-white">경찰청 사이버안전국</strong>
                  <br />
                  <span className="text-sm">- 전화: 국번없이 182</span>
                  <br />
                  <span className="text-sm">- 홈페이지: cyberbureau.police.go.kr</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 제12조 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              제12조 (개인정보처리방침의 변경)
            </h2>
            <div className="text-white/80 leading-relaxed space-y-3">
              <p>
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는
                변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </div>
          </section>

          {/* 부칙 */}
          <section className="pt-8 border-t border-white/10">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#d4af37]">
              부칙
            </h2>
            <div className="text-white/80 space-y-2">
              <p><strong className="text-white">공고일자:</strong> 2026년 1월 1일</p>
              <p><strong className="text-white">시행일자:</strong> 2026년 1월 1일</p>
            </div>
          </section>
        </div>

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/terms"
            className="text-center px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
          >
            이용약관 보기
          </Link>
          <Link
            href="/"
            className="text-center px-6 py-3 rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] transition-all"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0f1014] px-4 py-8 mt-12">
        <div className="mx-auto max-w-5xl text-center text-sm text-white/50">
          <p>© 2026 운명테라피. 정통 명리 기반 사주 분석 서비스.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
