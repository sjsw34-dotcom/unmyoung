# 환경변수 설정 가이드

이 문서는 운명테라피 프로젝트의 환경 변수 설정 방법을 안내합니다.

## 📋 목차

1. [로컬 개발 환경 설정](#로컬-개발-환경-설정)
2. [프로덕션 환경 설정](#프로덕션-환경-설정)
3. [Vercel 배포 설정](#vercel-배포-설정)
4. [환경 변수 설명](#환경-변수-설명)

---

## 로컬 개발 환경 설정

### 1단계: .env.local 파일 생성

프로젝트 루트 디렉토리에서 다음 명령어를 실행:

```bash
cp .env.example .env.local
```

또는 수동으로 `.env.local` 파일을 생성합니다.

### 2단계: 개발용 환경 변수 설정

`.env.local` 파일에 다음 내용을 입력:

```env
# 애플리케이션 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Toss Payments (테스트 키)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
TOSS_SECRET_KEY=test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R

# Supabase (실제 키로 교체 필요)
NEXT_PUBLIC_SUPABASE_URL=https://hgsjxrrzxpfcwwbizxsl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
```

### 3단계: Supabase 키 발급

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** > **API** 메뉴
4. 다음 키들을 복사:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 4단계: 개발 서버 실행

```bash
npm install
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

---

## 프로덕션 환경 설정

### ⚠️ 중요: 프로덕션 키로 전환 필수!

런칭 전에 반드시 다음 작업을 완료해야 합니다:

### 1. Toss Payments 프로덕션 키 발급

1. [Toss Payments 개발자센터](https://developers.tosspayments.com/) 로그인
2. **내 애플리케이션** > **새 애플리케이션 만들기**
3. 애플리케이션 정보 입력:
   - 서비스 이름: 운명테라피
   - 카테고리: 디지털 콘텐츠
4. **실제 결제 사용** 활성화 (사업자 정보 필요)
5. **API 키** 메뉴에서 프로덕션 키 확인:
   - **클라이언트 키** → `NEXT_PUBLIC_TOSS_CLIENT_KEY`
   - **시크릿 키** → `TOSS_SECRET_KEY`

### 2. 프로덕션 환경 변수

`.env.local` (또는 Vercel 환경변수)에 다음과 같이 설정:

```env
# 실제 도메인
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Toss Payments 프로덕션 키
NEXT_PUBLIC_TOSS_CLIENT_KEY=live_ck_YOUR_ACTUAL_KEY
TOSS_SECRET_KEY=live_sk_YOUR_ACTUAL_SECRET_KEY

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://hgsjxrrzxpfcwwbizxsl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key

# Google Sheets (선택사항)
NEXT_PUBLIC_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

---

## Vercel 배포 설정

### Vercel 대시보드에서 환경 변수 추가

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** > **Environment Variables**
4. 다음 변수들을 하나씩 추가:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_APP_URL` | `https://yourdomain.com` | Production |
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | `live_ck_...` | Production |
| `TOSS_SECRET_KEY` | `live_sk_...` (Sensitive ✓) | Production |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://...supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhb...` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhb...` (Sensitive ✓) | Production |
| `NEXT_PUBLIC_GOOGLE_SHEET_URL` | `https://script.google.com/...` | Production (선택) |

### 환경별 설정

- **Production**: 실제 서비스 (프로덕션 키 사용)
- **Preview**: PR 미리보기 (테스트 키 사용 가능)
- **Development**: 로컬 개발 (테스트 키 사용)

### 재배포

환경 변수 추가 후 **Deployments** > **Redeploy**를 클릭하여 재배포합니다.

---

## 환경 변수 설명

### 필수 환경 변수

#### `NEXT_PUBLIC_APP_URL`
- **설명**: 애플리케이션의 기본 URL
- **개발**: `http://localhost:3000`
- **프로덕션**: `https://yourdomain.com`
- **용도**: 결제 성공/실패 리디렉션 URL 생성

#### `NEXT_PUBLIC_TOSS_CLIENT_KEY`
- **설명**: Toss Payments 클라이언트 키 (공개 가능)
- **테스트**: `test_ck_...`
- **프로덕션**: `live_ck_...`
- **용도**: 브라우저에서 Toss SDK 초기화

#### `TOSS_SECRET_KEY`
- **설명**: Toss Payments 시크릿 키 (⚠️ 절대 공개 금지)
- **테스트**: `test_sk_...`
- **프로덕션**: `live_sk_...`
- **용도**: 서버에서 결제 검증 및 승인

#### `NEXT_PUBLIC_SUPABASE_URL`
- **설명**: Supabase 프로젝트 URL
- **예시**: `https://xxxxx.supabase.co`
- **용도**: 데이터베이스 연결

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **설명**: Supabase Anon/Public 키 (공개 가능, RLS로 보호됨)
- **용도**: 클라이언트에서 데이터베이스 읽기

#### `SUPABASE_SERVICE_ROLE_KEY`
- **설명**: Supabase Service Role 키 (⚠️ 절대 공개 금지)
- **용도**: 서버에서 RLS 우회하여 데이터 쓰기

### 선택적 환경 변수

#### `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **설명**: Google Analytics GA4 측정 ID
- **예시**: `G-XXXXXXXXXX`
- **용도**: 사용자 행동 분석 (선택사항)

#### `NEXT_PUBLIC_SENTRY_DSN`
- **설명**: Sentry 에러 모니터링 DSN
- **예시**: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`
- **용도**: 프로덕션 에러 추적 (선택사항)

#### `NEXT_PUBLIC_GOOGLE_SHEET_URL`
- **설명**: Google Apps Script 웹 앱 배포 URL
- **예시**: `https://script.google.com/macros/s/AKfycbw-.../exec`
- **용도**: 주문 정보를 구글 시트에 자동 저장 (선택사항)
- **설정 방법**: `google-apps-script/SETUP.md` 참고

---

## 🔒 보안 주의사항

### ❌ 절대 공개하면 안 되는 키

다음 키들은 **절대로** Git에 커밋하거나 클라이언트 코드에 노출하면 안 됩니다:

- `TOSS_SECRET_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### ✅ 공개 가능한 키

다음 키들은 `NEXT_PUBLIC_` 접두사가 있어 브라우저에 노출되지만 안전합니다:

- `NEXT_PUBLIC_TOSS_CLIENT_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_APP_URL`

### 🛡️ 보안 체크리스트

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] 시크릿 키는 서버 컴포넌트나 API 라우트에서만 사용
- [ ] Vercel 환경변수에서 시크릿 키는 "Sensitive" 옵션 체크
- [ ] GitHub 등 공개 저장소에 환경 변수 파일 업로드 금지

---

## 🆘 문제 해결

### "환경 변수를 찾을 수 없습니다" 오류

1. `.env.local` 파일이 **프로젝트 루트**에 있는지 확인
2. 변수 이름 오타 확인 (대소문자 구분)
3. 개발 서버 재시작: `npm run dev`

### Vercel 배포 후 환경 변수 적용 안 됨

1. Vercel 대시보드에서 환경 변수 올바르게 설정했는지 확인
2. 환경(Production/Preview/Development) 선택 확인
3. **Redeploy** 클릭하여 재배포

### Supabase 연결 실패

1. Supabase 프로젝트가 활성화되어 있는지 확인
2. API 키가 올바른지 Supabase Dashboard에서 재확인
3. 네트워크 방화벽 설정 확인

---

## 📚 관련 문서

- [Toss Payments 개발자 문서](https://docs.tosspayments.com/)
- [Supabase 문서](https://supabase.com/docs)
- [Next.js 환경 변수 가이드](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel 환경 변수 설정](https://vercel.com/docs/concepts/projects/environment-variables)

---

**마지막 업데이트:** 2026-01-11
