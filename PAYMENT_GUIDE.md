# 토스페이먼츠 결제 연동 가이드

## 📋 완료된 작업

✅ 토스페이먼츠 SDK 설치  
✅ 결제 모달에 결제 기능 추가  
✅ 결제 성공 페이지 생성  
✅ 결제 실패 페이지 생성  
✅ 결제 승인 API 생성  
✅ Vercel 배포 설정 완료  

---

## 🚀 배포 전 필수 설정

### 1️⃣ 환경변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하세요:

```env
# 토스페이먼츠 API 키 (개발자센터에서 발급)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxxxxxxxxxxxxxxxxxxxxxx
TOSS_SECRET_KEY=test_sk_xxxxxxxxxxxxxxxxxxxxxxxx

# 애플리케이션 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2️⃣ 토스페이먼츠 API 키 발급

1. **토스페이먼츠 개발자센터 가입**
   - https://developers.tosspayments.com 접속
   - 회원가입 및 로그인

2. **애플리케이션 생성**
   - "내 애플리케이션" 메뉴 클릭
   - "새 애플리케이션 만들기" 클릭
   - 이름: "운명테라피"

3. **테스트 API 키 복사**
   - 클라이언트 키: `test_ck_...` (공개 가능)
   - 시크릿 키: `test_sk_...` (절대 공개 금지)

4. **`.env.local`에 키 입력**
   ```env
   NEXT_PUBLIC_TOSS_CLIENT_KEY=복사한_클라이언트_키
   TOSS_SECRET_KEY=복사한_시크릿_키
   ```

---

## 🧪 로컬 테스트

### 1. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 2. 테스트 결제 진행

1. 상품 선택 (신년운세, 기본 분석, 프리미엄 종합 분석)
2. 정보 입력 (이름, 생년월일, 성별, 이메일)
3. "결제하기" 버튼 클릭
4. 토스페이먼츠 결제창에서 테스트 카드 입력

**테스트 카드 정보:**
```
카드번호: 4242-4242-4242-4242
유효기간: 12/25 (미래 날짜 아무거나)
CVC: 123
비밀번호: 00
```

### 3. 결제 완료 확인

- 성공 시: `/payment/success` 페이지로 이동
- 실패 시: `/payment/fail` 페이지로 이동

---

## 🌐 Vercel 배포

### 방법 1: CLI로 배포 (가장 빠름)

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포 실행
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동 배포 (권장)

1. **GitHub에 코드 푸시**
   ```bash
   git add .
   git commit -m "결제 기능 추가"
   git push origin main
   ```

2. **Vercel에서 프로젝트 연결**
   - https://vercel.com 접속 및 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - "Import" 클릭

3. **환경변수 설정**
   - "Environment Variables" 탭 클릭
   - 다음 변수 추가:
     ```
     NEXT_PUBLIC_TOSS_CLIENT_KEY = test_ck_...
     TOSS_SECRET_KEY = test_sk_...
     NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
     ```

4. **배포 완료**
   - "Deploy" 클릭
   - 몇 분 후 자동으로 URL 생성됨
   - 예: `https://unmyoung.vercel.app`

---

## 🎯 배포 후 작업

### 1. 토스페이먼츠 가맹점 신청

이제 URL이 있으니 가맹점 신청 가능:

1. **토스페이먼츠 가맹점 신청**
   - https://www.tosspayments.com 접속
   - "가맹점 신청" 클릭
   - 배포된 URL 입력: `https://unmyoung.vercel.app`
   - 사업자 정보 입력

2. **승인 대기** (보통 1~3일)

3. **실제 API 키 발급**
   - 승인 완료 후 개발자센터에서 "라이브 키" 발급

4. **Vercel 환경변수 업데이트**
   - 테스트 키 → 라이브 키로 교체
   ```
   NEXT_PUBLIC_TOSS_CLIENT_KEY = live_ck_...
   TOSS_SECRET_KEY = live_sk_...
   ```

5. **재배포**
   - 환경변수 변경 시 자동 재배포됨

---

## 💡 현재 흐름

```
사용자 방문
  ↓
상품 선택 (신년운세, 기본 분석, 프리미엄)
  ↓
정보 입력 (이름, 생년월일, 성별, 이메일)
  ↓
"결제하기" 버튼 클릭
  ↓
토스페이먼츠 결제창 팝업
  ↓
카드 정보 입력 및 결제
  ↓
결제 성공 → /payment/success
  ↓
24~48시간 내 이메일로 PDF 발송
```

---

## 📊 추가 기능 (선택사항)

### 구글 시트 연동

결제 정보를 구글 시트에 자동 저장하려면:

1. Zapier 설정 (무료)
2. 또는 Google Sheets API 직접 연동

자세한 내용은 별도 요청 시 안내드립니다.

### 이메일 자동 발송

결제 완료 시 자동 이메일 발송:

1. SendGrid, Resend 등 이메일 서비스 연동
2. `app/api/payment/confirm/route.ts`에 이메일 발송 로직 추가

---

## ⚠️ 주의사항

1. **시크릿 키 보안**
   - `TOSS_SECRET_KEY`는 절대 공개하지 마세요
   - GitHub에 업로드하지 마세요 (`.gitignore`에 `.env.local` 포함됨)

2. **테스트 환경**
   - 가맹점 승인 전까지는 테스트 키로만 개발
   - 실제 결제는 안 되지만 전체 플로우 확인 가능

3. **금액 확인**
   - 결제 금액이 정확한지 확인하세요
   - 서버 측에서도 금액 검증 필수

---

## 📞 문의

토스페이먼츠 관련 문의:
- 개발자 문서: https://docs.tosspayments.com
- 고객센터: 1544-7772

Vercel 배포 관련:
- 문서: https://vercel.com/docs
- 커뮤니티: https://vercel.com/community

---

## 🎉 완료!

이제 **로컬에서 테스트** 또는 **바로 배포**하실 수 있습니다!

배포 후 URL을 받으면 토스페이먼츠 가맹점 신청을 진행하세요.
