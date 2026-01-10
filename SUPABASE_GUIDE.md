# 🗄️ Supabase 백엔드 설정 가이드

## 📌 개요

이 프로젝트는 Supabase를 데이터베이스로 사용하여 결제 정보를 저장하고 관리합니다.

**Supabase 프로젝트 URL:** `https://hgsjxrrzxpfcwwbizxsl.supabase.co`

---

## 🚀 1단계: Supabase 데이터베이스 테이블 생성

### 1.1 Supabase Dashboard 접속
- https://supabase.com/dashboard
- 프로젝트: `unmyoung` 선택

### 1.2 SQL Editor에서 테이블 생성

**SQL Editor** → **New Query** → 아래 SQL 실행:

```sql
-- 주문 테이블 생성
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- 토스페이먼츠 정보
  order_id TEXT UNIQUE NOT NULL,
  payment_key TEXT,
  amount INTEGER NOT NULL,
  method TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- 고객 정보
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  birth_date DATE NOT NULL,
  calendar_type TEXT NOT NULL CHECK (calendar_type IN ('solar', 'lunar', 'leap')),
  birth_time TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  
  -- 패키지 정보
  package_name TEXT NOT NULL,
  
  -- 상태
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))
);

-- 인덱스 생성 (빠른 검색)
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Row Level Security (RLS) 활성화
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 서버(service_role)에서만 접근 가능하도록 정책 설정
CREATE POLICY "Service role only" ON orders
  FOR ALL
  USING (auth.role() = 'service_role');

-- 테이블 생성 확인
SELECT * FROM orders LIMIT 1;
```

---

## 🔑 2단계: API 키 확인

### 2.1 Supabase Dashboard에서 키 복사
- **Project Settings** → **API** 메뉴 이동
- 다음 2개 키 복사:
  1. **`anon` `public`** - 클라이언트용 (공개 가능)
  2. **`service_role`** - 서버용 (절대 비밀!)

---

## ⚙️ 3단계: 로컬 환경 변수 설정

### 3.1 `.env.local` 파일에 추가

프로젝트 루트의 `.env.local` 파일을 열고 다음 추가:

```env
# 기존 토스페이먼츠 키
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
TOSS_SECRET_KEY=test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase 추가 (복사한 키로 교체)
NEXT_PUBLIC_SUPABASE_URL=https://hgsjxrrzxpfcwwbizxsl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_public_키_붙여넣기
SUPABASE_SERVICE_ROLE_KEY=여기에_service_role_키_붙여넣기
```

### 3.2 서버 재시작

```bash
# 개발 서버 재시작 (환경 변수 적용)
npm run dev
```

---

## 🌐 4단계: Vercel 환경 변수 설정

### 4.1 Vercel Dashboard 접속
- https://vercel.com/dashboard
- 프로젝트 선택: `unmyoung`

### 4.2 환경 변수 추가
- **Settings** → **Environment Variables**
- 다음 3개 변수 추가:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://hgsjxrrzxpfcwwbizxsl.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (복사한 anon public 키) | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | (복사한 service_role 키) | Production, Preview, Development |

### 4.3 재배포
- 환경 변수 저장 후 자동 재배포됨
- 또는 **Deployments** → 최근 배포 → **Redeploy**

---

## ✅ 5단계: 테스트

### 5.1 로컬 테스트
1. `npm run dev`로 서버 실행
2. 테스트 결제 진행
3. Supabase Dashboard → **Table Editor** → `orders` 테이블 확인
4. 결제 정보가 저장되었는지 확인

### 5.2 API 테스트

#### 주문 목록 조회
```bash
# 최근 주문 50개 조회
curl http://localhost:3000/api/orders

# 완료된 주문만 조회
curl http://localhost:3000/api/orders?status=completed

# 특정 이메일의 주문 조회
curl http://localhost:3000/api/orders?email=test@example.com
```

#### 특정 주문 조회
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"orderId": "ORDER_1234567890_abc123"}'
```

---

## 📊 6단계: 데이터 확인 방법

### Supabase Dashboard에서 확인
1. **Table Editor** 메뉴 선택
2. `orders` 테이블 클릭
3. 저장된 주문 정보 확인

### 필터링 및 정렬
- **Filter**: `status = completed` 등
- **Sort**: `created_at DESC` (최신순)

---

## 🔒 보안 주의사항

### ⚠️ 절대 공개하면 안 되는 것
- ❌ `SUPABASE_SERVICE_ROLE_KEY` (절대 비밀!)
- ❌ `TOSS_SECRET_KEY` (절대 비밀!)

### ✅ 공개 가능한 것
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXT_PUBLIC_TOSS_CLIENT_KEY`

### Row Level Security (RLS)
- 테이블에 RLS가 활성화되어 있어, 클라이언트에서는 직접 접근 불가
- 오직 서버(API Routes)에서만 `service_role` 키로 접근 가능

---

## 🎯 구현된 기능

### ✅ 완료된 기능
1. **결제 정보 자동 저장** - 토스페이먼츠 결제 완료 시 DB에 자동 저장
2. **주문 조회 API** - `/api/orders` 엔드포인트
3. **실패 추적** - 결제 실패 정보도 DB에 기록
4. **타입 안정성** - TypeScript로 타입 정의

### 🔜 향후 추가 가능한 기능
- [ ] 관리자 대시보드 페이지 (주문 목록 UI)
- [ ] 이메일 자동 발송 (PDF 첨부)
- [ ] 환불 처리 기능
- [ ] 통계 및 분석 (일별/월별 매출)
- [ ] 고객 관리 (재구매 고객 분석)

---

## 🐛 트러블슈팅

### 문제 1: "relation 'orders' does not exist"
**원인**: 테이블이 생성되지 않음
**해결**: 1단계 SQL을 다시 실행

### 문제 2: "Invalid API key"
**원인**: 환경 변수가 잘못되었거나 설정되지 않음
**해결**: 
- `.env.local` 파일 확인
- 서버 재시작 (`npm run dev`)
- Vercel 환경 변수 확인

### 문제 3: "Row Level Security policy violation"
**원인**: RLS 정책 문제
**해결**: 
- `service_role` 키를 사용하는지 확인
- API에서 `supabaseAdmin` 클라이언트를 사용하는지 확인

### 문제 4: DB에 저장은 안 되는데 결제는 성공
**원인**: DB 저장 실패해도 결제는 성공으로 처리됨 (의도된 동작)
**해결**:
- 서버 로그 확인 (`console.error`)
- Supabase 연결 상태 확인
- 환경 변수 확인

---

## 📞 도움말

### Supabase 문서
- https://supabase.com/docs

### API Reference
- https://supabase.com/docs/reference/javascript/introduction

### 프로젝트 구조
```
unmyoung/
├── lib/
│   └── supabase.ts          # Supabase 클라이언트 설정
├── app/
│   └── api/
│       ├── orders/
│       │   └── route.ts     # 주문 조회 API
│       └── payment/
│           └── confirm/
│               └── route.ts # 결제 승인 + DB 저장
└── .env.local              # 환경 변수 (Git에 포함 안 됨)
```

---

## ✨ 완료!

이제 모든 결제 정보가 자동으로 Supabase에 저장됩니다! 🎉
