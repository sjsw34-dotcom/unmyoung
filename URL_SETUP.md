# URL 연동 가이드

## 📋 현재 상태
- ✅ GitHub 저장소: https://github.com/sjsw34-dotcom/unmyoung.git
- ✅ 코드 커밋 및 푸시 완료
- ⏳ Vercel 배포 및 URL 확인 필요
- ⏳ Toss Payments Redirect URL 등록 필요

---

## 🚀 1단계: Vercel 배포 및 URL 확인

### 방법 A: GitHub 저장소 연동 (자동 배포)

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard 접속
   - 로그인

2. **프로젝트 추가**
   - "Add New Project" 또는 "New Project" 클릭
   - GitHub 저장소 목록에서 `sjsw34-dotcom/unmyoung` 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - Framework Preset: Next.js (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동)
   - Output Directory: `.next` (자동)
   - Install Command: `npm install` (자동)

4. **환경 변수 설정**
   - "Environment Variables" 섹션에서 다음 추가:
   
   ```
   Key: NEXT_PUBLIC_TOSS_CLIENT_KEY
   Value: test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
   Environment: Production, Preview, Development (모두 선택)
   
   Key: TOSS_SECRET_KEY
   Value: test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R
   Environment: Production, Preview, Development (모두 선택)
   
   Key: NEXT_PUBLIC_APP_URL
   Value: https://unmyoung.vercel.app (임시, 배포 후 실제 URL로 변경)
   Environment: Production, Preview, Development (모두 선택)
   ```

5. **배포 실행**
   - "Deploy" 버튼 클릭
   - 배포 완료 대기 (약 2-5분)

6. **배포 URL 확인**
   - 배포 완료 후 "Visit" 버튼 클릭하거나
   - 상단에 표시되는 URL 확인
   - 예: `https://unmyoung-xxx.vercel.app` 또는 `https://unmyoung.vercel.app`

### 방법 B: Vercel CLI 사용

```bash
# Vercel CLI 설치 (처음 한 번만)
npm install -g vercel

# 프로젝트 폴더에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

---

## 🔗 2단계: 배포 URL을 환경변수에 업데이트

1. **Vercel 대시보드 → 프로젝트 → Settings**
   - https://vercel.com/dashboard → 프로젝트 선택 → Settings

2. **Environment Variables 수정**
   - `NEXT_PUBLIC_APP_URL` 찾기
   - Value를 실제 배포된 URL로 변경:
     ```
     Key: NEXT_PUBLIC_APP_URL
     Value: https://unmyoung-xxx.vercel.app (실제 배포 URL)
     ```
   - "Save" 클릭

3. **재배포 확인**
   - 환경변수 저장 시 자동 재배포가 시작됩니다
   - 또는 "Deployments" 탭에서 "Redeploy" 클릭

---

## 🔐 3단계: Toss Payments Redirect URL 등록

### 테스트 환경 설정

1. **토스페이먼츠 개발자센터 접속**
   - https://developers.tosspayments.com 접속
   - 로그인

2. **내 애플리케이션 선택**
   - "내 애플리케이션" 메뉴 클릭
   - 해당 애플리케이션 선택

3. **리다이렉트 URL 설정**
   - "설정" 또는 "Settings" 탭 클릭
   - "리다이렉트 URL" 또는 "Redirect URLs" 섹션 찾기
   - 다음 URL들을 추가:
     ```
     https://unmyoung-xxx.vercel.app/payment/success
     https://unmyoung-xxx.vercel.app/payment/fail
     ```
   - 또는 와일드카드 패턴 사용:
     ```
     https://unmyoung-xxx.vercel.app/payment/*
     ```
   - "저장" 또는 "Save" 클릭

### 프로덕션 환경 설정 (가맹점 승인 후)

가맹점 승인 후에도 동일한 방식으로 라이브 키의 Redirect URL을 등록하세요.

---

## ✅ 4단계: 테스트 확인

1. **배포된 사이트 접속**
   - 배포된 URL 접속: `https://unmyoung-xxx.vercel.app`

2. **결제 플로우 테스트**
   - 상품 선택 (신년운세, 기본 분석, 프리미엄)
   - 정보 입력 (이름, 생년월일, 성별, 이메일)
   - "결제하기" 버튼 클릭
   - 토스페이먼츠 결제창에서 테스트 카드 입력
     ```
     카드번호: 4242-4242-4242-4242
     유효기간: 12/25
     CVC: 123
     비밀번호: 00
     ```

3. **리다이렉트 확인**
   - 결제 성공 시: `/payment/success` 페이지로 이동하는지 확인
   - 결제 실패/취소 시: `/payment/fail` 페이지로 이동하는지 확인

---

## 📝 체크리스트

배포 및 URL 연동 완료 체크리스트:

- [ ] Vercel에 프로젝트 배포 완료
- [ ] 배포 URL 확인 (예: `https://unmyoung-xxx.vercel.app`)
- [ ] Vercel 환경변수 설정:
  - [ ] `NEXT_PUBLIC_TOSS_CLIENT_KEY` 설정
  - [ ] `TOSS_SECRET_KEY` 설정
  - [ ] `NEXT_PUBLIC_APP_URL`을 실제 배포 URL로 설정
- [ ] Toss Payments 개발자센터에서 Redirect URL 등록:
  - [ ] `/payment/success` URL 등록
  - [ ] `/payment/fail` URL 등록
- [ ] 배포된 사이트에서 결제 테스트 성공
- [ ] 성공/실패 페이지 리다이렉트 확인

---

## 🔄 URL 변경 시

만약 배포 URL이 변경되면:

1. **Vercel 환경변수 업데이트**
   - `NEXT_PUBLIC_APP_URL`을 새 URL로 변경

2. **Toss Payments Redirect URL 업데이트**
   - 개발자센터에서 기존 URL 삭제
   - 새 URL 등록

3. **코드 재배포**
   - 환경변수 변경 시 자동 재배포 또는 수동 재배포

---

## ⚠️ 주의사항

1. **환경변수는 대소문자 구분**
   - `NEXT_PUBLIC_APP_URL` 정확히 입력

2. **HTTPS 필수**
   - Toss Payments는 HTTPS URL만 허용
   - HTTP는 동작하지 않음

3. **와일드카드 사용 가능**
   - `https://*.vercel.app/payment/*` 형식으로 등록 가능
   - 여러 배포 환경 사용 시 유용

4. **테스트 vs 프로덕션**
   - 테스트 키: `test_ck_...`, `test_sk_...`
   - 프로덕션 키: `live_ck_...`, `live_sk_...`
   - 각각 다른 Redirect URL 등록 필요

---

## 📞 문제 해결

### 배포가 안 되면
- Vercel 대시보드에서 빌드 로그 확인
- `npm run build` 로컬에서 먼저 테스트

### Redirect URL 오류가 나면
- Toss Payments 개발자센터에서 URL 정확히 입력했는지 확인
- HTTPS인지 확인
- 경로가 정확한지 확인 (`/payment/success`, `/payment/fail`)

### 환경변수가 적용 안 되면
- Vercel에서 환경변수 저장 후 재배포
- 브라우저 캐시 삭제
- `process.env.NEXT_PUBLIC_APP_URL` 콘솔에서 확인

---

## 🎉 완료!

모든 설정이 완료되면:
1. ✅ 배포된 URL로 사이트 접속 가능
2. ✅ 결제 플로우 정상 작동
3. ✅ 성공/실패 페이지 리다이렉트 정상 작동
4. ✅ Toss Payments 가맹점 신청 준비 완료

이제 실제 고객이 결제를 진행할 수 있습니다! (가맹점 승인 후)
