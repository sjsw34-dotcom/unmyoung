# 보안 가이드

## 개요

이 문서는 운명테라피 웹 애플리케이션의 보안 구현 사항을 설명합니다.

## 구현된 보안 기능

### 1. API 보안

#### Rate Limiting
- 모든 API 엔드포인트에 Rate Limiting 적용
- `/api/orders` GET: 1분당 30회 제한 (관리자 전용)
- `/api/orders` POST: 1분당 10회 제한
- `/api/payment/confirm` POST: 1분당 5회 제한 (결제는 더 엄격)

#### 인증 및 권한
- 관리자 API는 API 키 인증 필요 (`X-API-Key` 헤더)
- 환경 변수 `API_SECRET_KEY` 설정 필요

#### 입력 검증
- 모든 사용자 입력에 대한 검증 및 sanitization
- 화이트리스트 방식의 입력 검증 (calendarType, gender 등)
- 이메일, 날짜, 금액 형식 검증
- OrderID 패턴 검증

### 2. 보안 헤더

다음 보안 헤더가 모든 응답에 적용됩니다:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload (프로덕션)
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(self)
Content-Security-Policy: (자세한 내용은 middleware.ts 참조)
```

### 3. CORS 정책

- API 엔드포인트에만 CORS 적용
- 허용된 오리진만 접근 가능
- Credentials 지원

### 4. 민감한 정보 보호

#### 로그 마스킹
- 로그에 기록되는 모든 민감한 정보는 자동으로 마스킹됨
- 이메일: `us***@example.com`
- 이름: `홍*`
- 생년월일: `1990-**-**`

#### 환경 변수
- 모든 시크릿은 환경 변수로 관리
- `.env.local` 파일은 Git에 커밋되지 않음
- `.env.example` 파일로 필요한 변수 문서화

### 5. XSS 방어

- 모든 사용자 입력은 sanitization 처리
- HTML 태그 제거
- JavaScript 프로토콜 제거
- 이벤트 핸들러 제거
- Content Security Policy 적용

### 6. CSRF 방어

- SameSite 쿠키 정책
- Origin 검증

### 7. SQL Injection 방어

- Supabase의 parameterized queries 사용
- 모든 입력 검증 및 타입 체크

## 환경 변수 설정

### 필수 환경 변수

```bash
# 토스페이먼츠
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_client_key
TOSS_SECRET_KEY=your_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 앱 URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 선택적 환경 변수

```bash
# 관리자 API 보호 (권장)
API_SECRET_KEY=your_random_secret_key
```

API_SECRET_KEY 생성:
```bash
openssl rand -base64 32
```

## 배포 체크리스트

### 프로덕션 배포 전

- [ ] 모든 테스트 키를 프로덕션 키로 교체
- [ ] `NEXT_PUBLIC_APP_URL`을 실제 도메인으로 설정
- [ ] `API_SECRET_KEY` 생성 및 설정
- [ ] HTTPS 활성화 확인
- [ ] 환경 변수가 Vercel에 올바르게 설정되었는지 확인
- [ ] `.env.local` 파일이 Git에 커밋되지 않았는지 확인
- [ ] 보안 헤더가 올바르게 적용되는지 테스트
- [ ] Rate limiting 동작 테스트
- [ ] CORS 정책 동작 테스트

### 정기 점검 사항

- [ ] 의존성 업데이트 및 보안 패치 적용
- [ ] 로그 검토 (비정상적인 접근 패턴 확인)
- [ ] Rate limit 조정 필요 여부 확인
- [ ] API 키 로테이션 (6개월마다 권장)

## API 사용법

### 관리자 API 사용

관리자 API에 접근하려면 `X-API-Key` 헤더 필요:

```bash
curl https://yourdomain.com/api/orders \
  -H "X-API-Key: your_api_secret_key"
```

### Rate Limiting 처리

429 응답을 받으면 1분 후 재시도:

```javascript
try {
  const response = await fetch('/api/orders', { ... });
  if (response.status === 429) {
    // 1분 후 재시도
    await new Promise(resolve => setTimeout(resolve, 60000));
    // 재시도 로직
  }
} catch (error) {
  // 에러 처리
}
```

## 보안 취약점 보고

보안 취약점을 발견하신 경우:
1. 공개 이슈로 등록하지 마세요
2. 관리자에게 직접 연락
3. 상세한 재현 방법 제공

## 참고 자료

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [Toss Payments Security](https://docs.tosspayments.com/guides/security)
- [Supabase Security](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
