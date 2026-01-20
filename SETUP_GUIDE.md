# 🚀 프로젝트 설정 가이드

unmyoung 사주 분석 웹사이트 설정 및 배포를 위한 통합 가이드입니다.

---

## 📋 목차

1. [빠른 시작](#1-빠른-시작)
2. [개발 서버 실행](#2-개발-서버-실행)
3. [Git 설정](#3-git-설정)
4. [Vercel 배포](#4-vercel-배포)
5. [도메인 연결](#5-도메인-연결)
6. [프론트엔드 가이드](#6-프론트엔드-가이드)

---

## 1. 빠른 시작

### 🚀 가장 쉬운 방법 (추천!)

#### 1단계: 서버 시작
**`start-server.bat`** 파일을 더블클릭하세요!

#### 2단계: 브라우저 열기
자동으로 열리지 않으면 브라우저 주소창에 입력:
```
http://localhost:3000
```

#### 3단계: 즐기기! 🎉
- Cursor AI를 종료해도 서버는 계속 실행됩니다
- 코드를 수정하면 자동으로 새로고침됩니다

### 🛑 서버 중지
**`stop-server.bat`** 파일을 더블클릭하세요!

### 📱 모바일에서 접속하기
1. 서버 시작 시 표시되는 Network 주소 확인 (예: `http://192.168.45.66:3000`)
2. 모바일 브라우저에서 해당 주소 접속

### ⚠️ 문제 해결
- **"포트가 이미 사용 중" 오류**: `stop-server.bat` 실행 후 다시 시작
- **"페이지를 찾을 수 없음" 오류**: 서버가 실행 중인지 확인
- **브라우저가 자동으로 열리지 않음**: 수동으로 `http://localhost:3000` 입력

---

## 2. 개발 서버 실행

### 방법 1: Windows PowerShell/CMD에서 직접 실행 (추천)

1. **Windows 검색**에서 `PowerShell` 또는 `명령 프롬프트(CMD)` 실행
2. **프로젝트 폴더로 이동**
   ```powershell
   cd C:\아빠\사주\강의\코딩\unmyoung
   ```
3. **개발 서버 시작**
   ```powershell
   npm run dev
   ```

### 방법 2: 배치 파일로 간편 실행
1. `start-server.bat` 파일을 더블클릭
2. 자동으로 서버 실행

### 방법 3: PM2로 백그라운드 실행 (프로덕션급)

#### 설치
```powershell
npm install -g pm2
```

#### 실행
```powershell
pm2 start npm --name "unmyoung-dev" -- run dev
```

#### 관리 명령어
```powershell
pm2 list              # 실행 중인 프로세스 확인
pm2 stop unmyoung-dev # 서버 중지
pm2 restart unmyoung-dev # 서버 재시작
pm2 logs unmyoung-dev    # 로그 보기
```

### 브라우저 접속 주소
- **로컬**: `http://localhost:3000`
- **네트워크**: `http://192.168.x.x:3000` (터미널에서 확인)

### 문제 해결

#### 포트 3000이 이미 사용 중일 때
```powershell
# 포트 3000 사용 프로세스 확인
netstat -ano | findstr :3000

# PID 번호 확인 후 종료
taskkill /F /PID [PID번호]
```

---

## 3. Git 설정

### 📥 Git 설치 (Windows)

#### 방법 1: 공식 웹사이트 (추천)
1. https://git-scm.com/download/win 접속
2. "Click here to download" 클릭
3. 설치 파일 실행
4. 추천 옵션:
   - ✅ Git Bash Here
   - ✅ Git GUI Here
   - ✅ Git LFS
   - 기본 에디터: Visual Studio Code 또는 Notepad

#### 방법 2: winget (Windows 11)
```powershell
winget install Git.Git
```

### 🔧 Git 초기 설정

```bash
# 사용자 이름 설정
git config --global user.name "Your Name"

# 이메일 설정
git config --global user.email "your.email@example.com"

# 기본 브랜치 이름 설정
git config --global init.defaultBranch main

# 설정 확인
git config --list
```

### 🚀 프로젝트에 Git 적용

```bash
# 1. Git 저장소 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 첫 커밋
git commit -m "초기 커밋: 운명테라피 사주 분석 웹사이트"
```

### 📊 Git 기본 명령어

```bash
# 상태 확인
git status
git log --oneline

# 변경사항 관리
git add .
git commit -m "메시지"

# 브랜치 관리
git branch                # 브랜치 목록
git checkout -b [브랜치명] # 브랜치 생성 + 전환
git merge [브랜치명]       # 브랜치 병합
```

### 🌐 GitHub 연동

1. **GitHub에서 새 저장소 생성**
2. **로컬 저장소 연결**
   ```bash
   git remote add origin https://github.com/[사용자명]/unmyoung-fortune.git
   git branch -M main
   git push -u origin main
   ```

### 📝 커밋 메시지 규칙

```
<타입>: <제목>

타입:
- feat: 새 기능
- fix: 버그 수정
- docs: 문서 변경
- style: 코드 포맷팅
- refactor: 리팩토링
```

---

## 4. Vercel 배포

### 🚀 Vercel 배포 및 URL 설정

#### 방법 A: GitHub 저장소 연동 (자동 배포 - 추천)

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard

2. **프로젝트 추가**
   - "New Project" 클릭
   - GitHub 저장소에서 `unmyoung` 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - Framework: Next.js (자동 감지)
   - Root Directory: `./`
   - Build Command: `npm run build`

4. **환경 변수 설정**
   ```
   Key: NEXT_PUBLIC_TOSS_CLIENT_KEY
   Value: test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq

   Key: TOSS_SECRET_KEY
   Value: test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R

   Key: NEXT_PUBLIC_SUPABASE_URL
   Value: [Supabase URL]

   Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [Supabase Anon Key]

   Key: SUPABASE_SERVICE_ROLE_KEY
   Value: [Supabase Service Role Key]

   Key: NEXT_PUBLIC_APP_URL
   Value: https://unmyoung.vercel.app (임시, 배포 후 업데이트)
   ```

5. **배포 실행**
   - "Deploy" 버튼 클릭
   - 배포 완료 대기 (약 2-5분)

6. **배포 URL 확인**
   - 예: `https://unmyoung.vercel.app`

### 🔗 배포 URL을 환경변수에 업데이트

1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. `NEXT_PUBLIC_APP_URL`을 실제 배포 URL로 변경
3. Save 후 자동 재배포

### 🔐 Toss Payments Redirect URL 등록

1. **토스페이먼츠 개발자센터 접속**
   - https://developers.tosspayments.com

2. **리다이렉트 URL 설정**
   - "내 애플리케이션" → 해당 앱 선택
   - "설정" → "Redirect URLs" 추가:
     ```
     https://unmyoung.vercel.app/payment/success
     https://unmyoung.vercel.app/payment/fail
     ```

### ✅ 테스트 확인

1. 배포된 사이트 접속
2. 결제 플로우 테스트
3. 성공/실패 페이지 리다이렉트 확인

---

## 5. 도메인 연결

### 🌐 Vercel에 도메인 연결하기

#### 1단계: Vercel 프로젝트에서 도메인 추가

1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. "Add Domain" 버튼 클릭
3. 구입한 도메인 입력 (예: `unmyoung.com`)

#### 2단계: DNS 설정 (도메인 등록업체)

##### 방법 A: 루트 도메인 (`unmyoung.com`)

**A 레코드 추가**
```
타입: A
이름: @ (또는 비워두기)
값: 76.76.21.21
TTL: 3600
```

**CNAME 레코드 추가 (www용)**
```
타입: CNAME
이름: www
값: cname.vercel-dns.com
TTL: 3600
```

##### 방법 B: 서브도메인 (`www.unmyoung.com`)

**CNAME 레코드 추가**
```
타입: CNAME
이름: www
값: cname.vercel-dns.com
TTL: 3600
```

#### 3단계: DNS 전파 대기
- 보통 몇 분에서 몇 시간 내에 적용
- 최대 24-48시간 소요 가능

#### 4단계: SSL 인증서 자동 발급 확인
- Vercel이 Let's Encrypt를 통해 자동 발급
- 도메인 연결 완료 후 몇 분 내 완료

### 주요 도메인 등록업체별 DNS 설정 위치

- **가비아**: 나의 서비스 관리 → 도메인 관리 → DNS 관리
- **후이즈**: 도메인 관리 → DNS 관리
- **네임칩**: Domain List → Advanced DNS
- **구글 도메인**: DNS 섹션 → Custom records

### 환경 변수 업데이트

1. Vercel 대시보드 → Settings → Environment Variables
2. `NEXT_PUBLIC_APP_URL` 변경:
   - 기존: `https://unmyoung.vercel.app`
   - 변경: `https://unmyoung.com`
3. Save 후 재배포

### 도메인 연결 확인

- Vercel: Settings → Domains에서 "Valid Configuration" 확인
- 브라우저: 새 도메인 접속 및 SSL 확인 (🔒)
- DNS 전파: https://dnschecker.org 확인

---

## 6. 프론트엔드 가이드

### 🎬 배경 영상 사용 가이드

#### 폴더 구조
```
public/
└── videos/
    ├── seoul.mp4      (Hero 섹션용)
    └── hwasung.mp4    (Footer 섹션용)
```

#### 영상 파일 최적화 팁
- **형식**: MP4 (H.264 코덱)
- **크기**: 최대 10MB 이하
- **해상도**: 1920x1080 또는 1280x720
- **길이**: 10-30초 루프

#### Next.js에서 영상 사용

```tsx
<div className="relative">
  {/* 배경 영상 */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
  </video>

  {/* 오버레이 */}
  <div className="absolute inset-0 bg-black/60" />

  {/* 콘텐츠 */}
  <div className="relative z-10">
    {/* 텍스트 등 */}
  </div>
</div>
```

#### 무료 영상 소스
- **Pexels Videos**: https://www.pexels.com/videos/
- **Pixabay Videos**: https://pixabay.com/videos/
- **Coverr**: https://coverr.co/
- **Mixkit**: https://mixkit.co/free-stock-video/

#### 추천 검색어
- "night sky", "stars", "galaxy"
- "gold particles", "light rays"
- "cosmic", "mystical", "ethereal"

#### 성능 최적화

**Lazy Loading**
```tsx
<video loading="lazy" ...>
```

**모바일 조건부 로딩**
```tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);

return (
  <div>
    {!isMobile && <video ...></video>}
    {isMobile && <div className="bg-gradient-to-b ..." />}
  </div>
);
```

---

## 📝 완료 체크리스트

### 개발 환경 설정
- [ ] Node.js 설치 확인 (`node -v`)
- [ ] 프로젝트 의존성 설치 (`npm install`)
- [ ] 개발 서버 실행 (`npm run dev`)
- [ ] 로컬 접속 확인 (`http://localhost:3000`)

### Git 설정
- [ ] Git 설치
- [ ] Git 초기 설정 (이름, 이메일)
- [ ] Git 저장소 초기화
- [ ] 첫 커밋 완료
- [ ] GitHub 저장소 연동 (선택)

### Vercel 배포
- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 설정
- [ ] 배포 완료
- [ ] 배포 URL 확인
- [ ] Toss Payments Redirect URL 등록

### 도메인 연결 (선택)
- [ ] 도메인 구입
- [ ] Vercel에 도메인 추가
- [ ] DNS 레코드 설정
- [ ] DNS 전파 확인
- [ ] SSL 인증서 발급 확인
- [ ] 환경 변수 업데이트

### 프론트엔드
- [ ] 배경 영상 파일 준비
- [ ] `public/videos/` 폴더 생성
- [ ] 영상 파일 저장
- [ ] 반응형 테스트
- [ ] 성능 최적화 확인

---

## 🆘 문제 해결

### 서버 관련
- **포트 충돌**: `netstat -ano | findstr :3000` 후 프로세스 종료
- **서버 시작 실패**: `npm install` 재실행
- **캐시 문제**: `.next` 폴더 삭제 후 재시작

### Git 관련
- **"git: command not found"**: PATH 확인 또는 PC 재부팅
- **한글 파일명 깨짐**: `git config --global core.quotepath false`

### Vercel 배포 관련
- **빌드 실패**: 로컬에서 `npm run build` 테스트
- **환경 변수 미적용**: 저장 후 재배포
- **Redirect URL 오류**: Toss Payments에서 URL 확인

### 도메인 관련
- **DNS 전파 느림**: 최대 48시간 대기
- **SSL 미발급**: DNS 전파 완료 후 자동 발급

---

## 📚 참고 링크

- **Next.js 공식 문서**: https://nextjs.org/docs
- **Vercel 문서**: https://vercel.com/docs
- **토스페이먼츠 개발자센터**: https://developers.tosspayments.com
- **Git 공식 문서**: https://git-scm.com/doc
- **Supabase 문서**: https://supabase.com/docs

---

**프로젝트**: 운명테라피 사주 분석 웹사이트
**기술 스택**: Next.js 16.1.1, React 19, TypeScript, Tailwind CSS
**배포**: Vercel
**결제**: 토스페이먼츠
**DB**: Supabase
