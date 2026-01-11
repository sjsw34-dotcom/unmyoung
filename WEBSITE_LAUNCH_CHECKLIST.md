# 웹사이트 런칭 준비 체크리스트

## 📋 목차
1. [환경 설정](#1-환경-설정)
2. [보안](#2-보안)
3. [성능 최적화](#3-성능-최적화)
4. [SEO 및 검색 엔진 최적화](#4-seo-및-검색-엔진-최적화)
5. [결제 시스템](#5-결제-시스템)
6. [데이터베이스](#6-데이터베이스)
7. [모니터링 및 분석](#7-모니터링-및-분석)
8. [법률 및 규정 준수](#8-법률-및-규정-준수)
9. [콘텐츠 및 UX](#9-콘텐츠-및-ux)
10. [배포 및 인프라](#10-배포-및-인프라)
11. [테스트](#11-테스트)
12. [런칭 후 체크리스트](#12-런칭-후-체크리스트)

---

## 1. 환경 설정

### ✅ 환경 변수 설정

#### 현재 상태
- [ ] **Toss Payments 프로덕션 키 전환**
  - 현재: 테스트 키 사용 중 (`test_ck_`, `test_sk_`)
  - 필요: [Toss Payments 개발자 센터](https://developers.tosspayments.com/)에서 프로덕션 키 발급
  ```env
  NEXT_PUBLIC_TOSS_CLIENT_KEY=live_ck_XXXXX  # 실제 키로 교체 필요
  TOSS_SECRET_KEY=live_sk_XXXXX  # 실제 키로 교체 필요
  ```

- [ ] **Supabase 환경 변수 설정**
  - 현재: `.env.local` 파일 없음
  - 필요: Supabase 키 추가
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://hgsjxrrzxpfcwwbizxsl.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
  ```

- [ ] **프로덕션 URL 설정**
  ```env
  NEXT_PUBLIC_APP_URL=https://yourdomain.com  # 실제 도메인으로 교체
  ```

#### Vercel 환경 변수 설정
- [ ] Vercel 대시보드에서 모든 환경 변수 설정
- [ ] Production, Preview, Development 환경별로 적절한 값 설정
- [ ] 민감한 키들은 "Sensitive" 옵션 체크

---

## 2. 보안

### ✅ API 및 키 보안
- [ ] **환경 변수 검증**
  - [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인
  - [ ] 코드에 하드코딩된 시크릿 키가 없는지 확인
  - [ ] GitHub 등 공개 저장소에 민감 정보 노출 여부 확인

- [ ] **Supabase 보안 설정**
  - [ ] Row Level Security (RLS) 정책 활성화 확인
  - [ ] Service Role Key는 서버 사이드에서만 사용하는지 확인
  - [ ] 데이터베이스 백업 자동화 설정

- [ ] **Toss Payments 보안**
  - [ ] 프로덕션 Secret Key는 서버 환경에만 저장
  - [ ] 결제 금액 검증 로직 확인 (서버 사이드)
  - [ ] 결제 완료 웹훅 설정 (선택사항)

### ✅ HTTPS 및 도메인 보안
- [ ] **SSL 인증서 설정** (Vercel은 자동 제공)
- [ ] **도메인 설정**
  - [ ] 도메인 구매 완료
  - [ ] Vercel에 커스텀 도메인 연결
  - [ ] DNS 레코드 설정 (A 레코드 또는 CNAME)
  - [ ] HTTPS 강제 리디렉션 활성화

### ✅ 보안 헤더 설정
- [ ] **Next.js Security Headers 추가** (`next.config.ts`)
  ```typescript
  const securityHeaders = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'Referrer-Policy',
      value: 'origin-when-cross-origin'
    }
  ]
  ```

- [ ] **CORS 정책 검토**

---

## 3. 성능 최적화

### ✅ 이미지 및 비디오 최적화
- [ ] **비디오 파일 최적화**
  - 현재: `seoul.mp4` (2.3MB), `hwasung.mp4` (9.1MB)
  - [ ] 비디오 압축 (H.264/H.265 코덱 사용)
  - [ ] WebM 포맷 추가 (Safari는 MP4 폴백)
  - [ ] 모바일에서는 비디오 비활성화 확인 (현재 768px 미만에서 비활성화됨)
  - [ ] Lazy loading 적용 확인

- [ ] **이미지 최적화**
  - 현재: `review1.jpg` (154KB), `review2.jpg` (135KB)
  - [ ] Next.js Image 컴포넌트로 전환 권장
  - [ ] WebP 포맷 변환
  - [ ] 적절한 크기로 리사이징 (원본 너무 크면)

### ✅ 번들 크기 최적화
- [ ] **빌드 분석**
  ```bash
  npm install -D @next/bundle-analyzer
  npm run build
  ```
- [ ] 불필요한 의존성 제거
- [ ] Dynamic Import 사용 검토 (특히 Toss SDK)

### ✅ 캐싱 전략
- [ ] **Static Assets 캐싱**
  - Vercel은 자동으로 처리하지만 확인 필요
- [ ] **API Route 캐싱 전략**
  - `/api/orders` GET 요청 캐싱 고려
- [ ] **CDN 설정** (Vercel Edge Network 활용)

### ✅ 폰트 최적화
- [x] Google Fonts Preconnect 설정됨 (`layout.tsx`)
- [ ] 필요한 폰트 웨이트만 로드하는지 확인

---

## 4. SEO 및 검색 엔진 최적화

### ✅ 메타데이터
- [x] 기본 메타데이터 설정됨 (`layout.tsx:15-41`)
- [ ] **추가 최적화**
  - [ ] Open Graph 이미지 추가 (`og:image`)
  - [ ] Twitter Card 이미지 추가
  - [ ] Canonical URL 설정

### ✅ Sitemap 및 Robots.txt
- [ ] **Sitemap 생성** (`app/sitemap.ts`)
  ```typescript
  export default function sitemap() {
    return [
      {
        url: 'https://yourdomain.com',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: 'https://yourdomain.com/payment/success',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      }
    ]
  }
  ```

- [ ] **Robots.txt 생성** (`app/robots.ts`)
  ```typescript
  export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/payment/'],
      },
      sitemap: 'https://yourdomain.com/sitemap.xml',
    }
  }
  ```

### ✅ 구조화된 데이터 (Schema.org)
- [ ] **JSON-LD 추가** (서비스 페이지)
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "사주팔자 명리 분석",
    "description": "정통 만세력 기반 사주 분석",
    "provider": {
      "@type": "Organization",
      "name": "운명 명리 분석"
    },
    "offers": {
      "@type": "Offer",
      "price": "29900",
      "priceCurrency": "KRW"
    }
  }
  ```

### ✅ Google Search Console & Analytics
- [ ] Google Search Console 등록
  - [ ] 사이트 소유권 확인
  - [ ] Sitemap 제출
- [ ] Google Analytics 설정 (GA4)
  - [ ] 추적 코드 설치
  - [ ] 전환 이벤트 설정 (결제 완료)
- [ ] Naver Search Advisor 등록 (한국 시장)
  - [ ] 사이트 소유권 확인
  - [ ] Sitemap 제출

---

## 5. 결제 시스템

### ✅ Toss Payments 설정
- [ ] **프로덕션 전환**
  - [ ] 프로덕션 키 발급 및 적용
  - [ ] 테스트 결제 진행 (스테이징 환경)
  - [ ] 실제 카드로 소액 테스트 결제

- [ ] **결제 플로우 검증**
  - [ ] 성공 시나리오 테스트
  - [ ] 실패 시나리오 테스트
  - [ ] 결제 취소 플로우 테스트
  - [ ] 부분 취소 기능 필요 여부 검토

- [ ] **웹훅 설정** (선택사항)
  - [ ] Toss에서 결제 상태 변경 시 알림 받기
  - [ ] `/api/webhooks/toss` 엔드포인트 구현

### ✅ 결제 관련 법률 준수
- [ ] **전자금융거래법 준수**
  - [ ] 결제 전 최종 금액 확인 화면 제공
  - [ ] 결제 완료 후 영수증/거래 내역 제공
  - [ ] 환불 정책 명시

- [ ] **사업자 정보 표시**
  - [ ] 사업자등록번호
  - [ ] 통신판매업 신고번호
  - [ ] 연락처 (전화번호, 이메일)
  - [ ] 주소

---

## 6. 데이터베이스

### ✅ Supabase 프로덕션 설정
- [ ] **데이터베이스 스키마 확인**
  - [x] `orders` 테이블 생성 확인
  - [ ] 인덱스 최적화 (자주 쿼리하는 컬럼)
  - [ ] 외래 키 제약 조건 확인

- [ ] **백업 설정**
  - [ ] 자동 백업 활성화 (Supabase 대시보드)
  - [ ] 백업 주기 설정 (일일 권장)
  - [ ] 수동 백업 테스트

- [ ] **성능 모니터링**
  - [ ] Slow Query 모니터링
  - [ ] Connection Pool 설정 확인

### ✅ 데이터 개인정보 보호
- [ ] **GDPR/개인정보보호법 준수**
  - [ ] 개인정보 수집 동의 명시
  - [ ] 개인정보 처리방침 페이지 작성
  - [ ] 데이터 보관 기간 명시
  - [ ] 데이터 삭제 요청 프로세스 마련

---

## 7. 모니터링 및 분석

### ✅ 에러 모니터링
- [ ] **Sentry 설치** (추천)
  ```bash
  npm install @sentry/nextjs
  ```
  - [ ] 프론트엔드 에러 추적
  - [ ] API 에러 추적
  - [ ] 알림 설정 (이메일, Slack)

### ✅ 성능 모니터링
- [ ] **Vercel Analytics 활성화**
  - [ ] Web Vitals 모니터링
  - [ ] 페이지 로딩 속도 추적

### ✅ 비즈니스 분석
- [ ] **전환 추적 설정**
  - [ ] 결제 완료 이벤트
  - [ ] 패키지 선택 이벤트
  - [ ] 카카오톡 문의 클릭 이벤트

- [ ] **UTM 파라미터 설정**
  - 마케팅 캠페인 추적용

---

## 8. 법률 및 규정 준수

### ✅ 필수 약관 페이지
- [ ] **이용약관 페이지** (`/terms`)
- [ ] **개인정보 처리방침** (`/privacy`)
- [ ] **환불 정책** (FAQ에 포함되어 있음, 별도 페이지 권장)
- [ ] **사업자 정보** (Footer에 추가)

### ✅ 사업자 등록
- [ ] 사업자등록증 발급
- [ ] 통신판매업 신고
- [ ] Toss Payments 정산 계좌 설정

### ✅ 쿠키 및 개인정보 동의
- [ ] **쿠키 배너** (필요시)
- [ ] **주문 시 개인정보 수집 동의 체크박스**
  - 현재 `app/page.tsx`의 OrderModal에 추가 필요

---

## 9. 콘텐츠 및 UX

### ✅ 콘텐츠 최종 검토
- [ ] **오타 및 문법 검사**
- [ ] **가격 및 패키지 정보 확인**
  - 현재: 신년운세 19,900원, 기본 9,800원, 프리미엄 29,900원
- [ ] **연락처 정보 업데이트**
  - 카카오톡 채널 링크 작동 확인
  - 이메일 주소 확인

### ✅ 사용자 경험 테스트
- [ ] **모바일 반응형 테스트**
  - [ ] iPhone (Safari)
  - [ ] Android (Chrome)
  - [ ] 태블릿

- [ ] **브라우저 호환성 테스트**
  - [ ] Chrome
  - [ ] Safari
  - [ ] Firefox
  - [ ] Edge
  - [ ] 모바일 브라우저 (네이버, 카카오톡 인앱)

- [ ] **결제 플로우 테스트**
  - [ ] 모달 열기/닫기
  - [ ] 폼 검증
  - [ ] 결제 성공/실패 시나리오

### ✅ 접근성 (Accessibility)
- [ ] **ARIA 레이블 추가**
- [ ] **키보드 네비게이션 테스트**
- [ ] **스크린 리더 테스트** (선택사항)

---

## 10. 배포 및 인프라

### ✅ Vercel 배포 설정
- [x] `vercel.json` 설정 완료 (서울 리전: icn1)
- [ ] **도메인 연결**
  - [ ] Vercel에 도메인 추가
  - [ ] DNS 설정
  - [ ] SSL 인증서 자동 발급 확인

- [ ] **환경 변수 설정**
  - [ ] Production 환경 변수 설정
  - [ ] Preview 환경 변수 설정

- [ ] **빌드 설정 확인**
  - [ ] 빌드 명령어: `npm run build`
  - [ ] Node.js 버전: 20.x

### ✅ CI/CD 설정
- [ ] **자동 배포 설정**
  - Vercel은 GitHub 연동 시 자동 배포
  - [ ] main 브랜치 푸시 시 프로덕션 배포
  - [ ] PR 생성 시 미리보기 배포

### ✅ 성능 테스트
- [ ] **로드 테스트**
  - 동시 접속자 시뮬레이션
- [ ] **Lighthouse 점수 확인**
  - 목표: Performance 90+ 권장

---

## 11. 테스트

### ✅ 기능 테스트
- [ ] **주요 사용자 플로우**
  - [ ] 홈페이지 접속
  - [ ] 패키지 선택
  - [ ] 주문 폼 작성
  - [ ] 결제 진행
  - [ ] 결제 성공 확인
  - [ ] 이메일 수신 (구현 시)

### ✅ 에러 핸들링 테스트
- [ ] **네트워크 오류**
  - [ ] API 실패 시나리오
  - [ ] Timeout 처리
- [ ] **잘못된 입력**
  - [ ] 빈 폼 제출
  - [ ] 잘못된 날짜 형식
- [ ] **결제 실패**
  - [ ] 결제 취소
  - [ ] 잔액 부족

### ✅ 보안 테스트
- [ ] **SQL Injection 테스트** (Supabase는 자동 방어)
- [ ] **XSS 테스트** (React는 자동 방어)
- [ ] **CSRF 테스트**

---

## 12. 런칭 후 체크리스트

### ✅ 첫 24시간
- [ ] 에러 로그 모니터링
- [ ] 결제 정상 작동 확인
- [ ] 서버 리소스 사용량 확인
- [ ] 실시간 사용자 수 모니터링

### ✅ 첫 주
- [ ] Google Search Console 인덱싱 확인
- [ ] 전환율 분석
- [ ] 사용자 피드백 수집
- [ ] 성능 지표 검토 (Web Vitals)

### ✅ 지속적인 유지보수
- [ ] 주간 데이터베이스 백업 확인
- [ ] 월간 보안 업데이트
- [ ] 의존성 업데이트 (npm)
- [ ] 사용자 리뷰 및 개선 사항 반영

---

## 📊 우선순위별 분류

### 🔴 높음 (런칭 전 필수)
1. Toss Payments 프로덕션 키 전환
2. Supabase 환경 변수 설정
3. 도메인 및 HTTPS 설정
4. 사업자 정보 표시
5. 이용약관 및 개인정보처리방침
6. 결제 플로우 테스트
7. 모바일 반응형 테스트

### 🟡 중간 (런칭 직후 필요)
1. Google Analytics 설치
2. Sentry 에러 모니터링
3. Sitemap 및 Robots.txt
4. 비디오 최적화
5. Open Graph 이미지
6. 백업 설정

### 🟢 낮음 (점진적 개선)
1. 구조화된 데이터 (Schema.org)
2. PWA 기능 강화
3. 번들 크기 최적화
4. 접근성 개선
5. A/B 테스트 설정

---

## 🚀 빠른 실행 가이드

### 1단계: 환경 설정 (30분)
```bash
# 1. 환경 변수 파일 생성
cp .env.example .env.local  # .env.example이 없으면 직접 생성

# 2. Vercel 배포
vercel --prod

# 3. Vercel 대시보드에서 환경 변수 설정
```

### 2단계: 필수 페이지 추가 (1시간)
- `/app/terms/page.tsx` - 이용약관
- `/app/privacy/page.tsx` - 개인정보처리방침
- `/app/sitemap.ts` - Sitemap
- `/app/robots.ts` - Robots.txt

### 3단계: 테스트 (2시간)
- 결제 플로우 전체 테스트
- 모바일 디바이스 테스트
- 브라우저 호환성 테스트

### 4단계: 모니터링 설정 (1시간)
- Google Analytics 설치
- Sentry 설치
- Vercel Analytics 활성화

---

## 📞 지원 및 문의

### 주요 서비스 문서
- [Toss Payments 개발자 문서](https://docs.tosspayments.com/)
- [Supabase 문서](https://supabase.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel 문서](https://vercel.com/docs)

### 추가 도움이 필요하면
- Toss Payments 고객센터: 1544-7772
- Supabase Support: support@supabase.com
- Vercel Support: support@vercel.com

---

**마지막 업데이트:** 2026-01-11
**작성자:** Claude Code Assistant
