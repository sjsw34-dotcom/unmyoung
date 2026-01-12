# 🚀 배포 전 체크리스트

## ✅ 빌드 확인
- [x] `npm run build` 성공
- [x] TypeScript 오류 없음
- [x] 모든 페이지 정상 생성

## 🔐 필수 환경 변수 (Vercel에 설정 필요)

### 1. 토스페이먼츠 (결제)
```
NEXT_PUBLIC_TOSS_CLIENT_KEY=실제_프로덕션_키
TOSS_SECRET_KEY=실제_프로덕션_시크릿_키
```

### 2. 앱 URL
```
NEXT_PUBLIC_APP_URL=https://unmyoung.vercel.app
```
⚠️ **중요**: 배포 후 실제 도메인으로 변경 필요

### 3. Supabase (데이터베이스)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📋 Vercel 배포 설정 방법

### 1. 환경 변수 추가
1. Vercel 대시보드 접속
2. 프로젝트 선택
3. Settings → Environment Variables
4. 위의 모든 환경 변수 추가
5. **Production, Preview, Development 모두 선택**

### 2. 배포 확인 사항
- [ ] 환경 변수 모두 설정됨
- [ ] 빌드 성공
- [ ] 결제 테스트 (테스트 모드)
- [ ] Supabase 연결 확인
- [ ] 결제 성공 시 DB 저장 확인

## ⚠️ 배포 전 주의사항

### 1. 테스트 키 vs 프로덕션 키
- 현재 코드에 테스트 키가 fallback으로 설정되어 있음
- **프로덕션 배포 시 반드시 실제 키로 변경 필요**

### 2. URL 설정
- `NEXT_PUBLIC_APP_URL`은 배포된 실제 URL로 설정
- 예: `https://unmyoung.vercel.app`

### 3. Supabase 연결
- Supabase 프로젝트가 활성화되어 있는지 확인
- `orders` 테이블이 생성되어 있는지 확인
- RLS (Row Level Security) 정책 확인

## 🧪 배포 후 테스트

### 필수 테스트 항목
1. [ ] 홈페이지 로딩 확인
2. [ ] 결제 모달 열기
3. [ ] 결제 프로세스 (테스트 모드)
4. [ ] 결제 성공 페이지
5. [ ] 결제 실패 페이지
6. [ ] Supabase에 데이터 저장 확인
7. [ ] 모바일 반응형 확인

## 📝 현재 상태

### ✅ 완료된 항목
- 빌드 성공
- 모든 페이지 정상 생성
- API Routes 설정 완료
- Supabase 연동 완료
- 결제 시스템 연동 완료

### ⚠️ 배포 전 필수 작업
1. Vercel에 환경 변수 설정
2. 프로덕션 키로 변경 (테스트 키 → 실제 키)
3. 배포 후 URL 확인 및 업데이트

## 🎯 배포 명령어

```bash
# Git에 푸시하면 자동 배포 (Vercel 연동 시)
git add .
git commit -m "배포 준비 완료"
git push

# 또는 Vercel CLI 사용
vercel --prod
```
