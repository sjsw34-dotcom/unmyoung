# 🔧 Git 설치 및 초기 설정 가이드

## 📥 Git 설치 방법

### Windows 10/11

#### 방법 1: 공식 웹사이트에서 다운로드 (추천) ⭐

1. **Git 다운로드**
   - 웹사이트: https://git-scm.com/download/win
   - "Click here to download" 클릭
   - 자동으로 다운로드 시작

2. **설치 실행**
   - 다운로드된 `Git-[버전]-64-bit.exe` 실행
   - "Next" 클릭으로 진행

3. **설치 옵션 (추천 설정)**
   - ✅ Git Bash Here
   - ✅ Git GUI Here
   - ✅ Git LFS (Large File Support)
   - ✅ Associate .git* configuration files
   - ✅ Associate .sh files to be run with Bash

4. **기본 에디터 선택**
   - 추천: "Use Visual Studio Code as Git's default editor"
   - 또는: "Use Notepad as Git's default editor"

5. **PATH 환경 변수**
   - 선택: "Git from the command line and also from 3rd-party software" (추천)

6. **줄바꿈 설정**
   - Windows: "Checkout Windows-style, commit Unix-style line endings"

7. **설치 완료**
   - "Install" 클릭
   - "Finish" 클릭

#### 방법 2: Chocolatey (패키지 관리자)

PowerShell을 **관리자 권한**으로 실행:

```powershell
# Chocolatey 설치 (아직 없다면)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Git 설치
choco install git -y

# 설치 확인
git --version
```

#### 방법 3: winget (Windows 11)

```powershell
winget install Git.Git
```

---

## 🔧 Git 초기 설정

설치 후 PowerShell 또는 Git Bash에서 실행:

```bash
# 사용자 이름 설정
git config --global user.name "Your Name"

# 이메일 설정
git config --global user.email "your.email@example.com"

# 기본 브랜치 이름 설정 (main)
git config --global init.defaultBranch main

# 설정 확인
git config --list
```

---

## 🚀 프로젝트에 Git 적용

### 1. Git 저장소 초기화

프로젝트 폴더에서:

```bash
cd C:\아빠\사주\강의\코딩\unmyoung

# Git 저장소 초기화
git init

# 결과: Initialized empty Git repository
```

### 2. .gitignore 파일 생성

제외할 파일/폴더 설정:

```bash
# .gitignore 내용 확인 (이미 생성되어 있음)
cat .gitignore
```

### 3. 모든 파일 추가

```bash
# 현재 작업 상태 확인
git status

# 모든 파일 스테이징
git add .

# 스테이징된 파일 확인
git status
```

### 4. 첫 커밋

```bash
git commit -m "초기 커밋: 운명테라피 사주 분석 랜딩 페이지 완성

주요 기능:
- 7개 섹션 구성 (Hero, Story, Hook, Packages, Process, FAQ, CTA)
- 영상 배경 시스템 (seoul.mp4, hwasung.mp4)
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 모달 신청 시스템
- SEO 최적화 (Meta, OG, Twitter)
- 카카오톡 채널 연동 (http://pf.kakao.com/_fECQn)
- 10+ 인터랙션 애니메이션
- 성능 최적화 (모바일 영상 비활성화)

기술 스택:
- Next.js 16.1.1 (Turbopack)
- React 19
- TypeScript
- Tailwind CSS

브랜드: 운명테라피
상태: 배포 준비 완료"
```

---

## 📊 Git 기본 명령어

### 상태 확인
```bash
git status          # 현재 상태
git log             # 커밋 히스토리
git log --oneline   # 간단한 히스토리
```

### 변경사항 관리
```bash
git add .                    # 모든 변경사항 추가
git add [파일명]              # 특정 파일만 추가
git commit -m "메시지"       # 커밋
git commit -am "메시지"      # add + commit (수정된 파일만)
```

### 변경사항 되돌리기
```bash
git restore [파일명]         # 파일 변경사항 취소
git restore --staged [파일]  # 스테이징 취소
git reset HEAD~1             # 마지막 커밋 취소 (변경사항 유지)
git reset --hard HEAD~1      # 마지막 커밋 취소 (변경사항 삭제)
```

### 브랜치 관리
```bash
git branch                   # 브랜치 목록
git branch [브랜치명]         # 브랜치 생성
git checkout [브랜치명]       # 브랜치 전환
git checkout -b [브랜치명]    # 생성 + 전환
git merge [브랜치명]          # 브랜치 병합
```

---

## 🌐 원격 저장소 (GitHub/GitLab)

### GitHub 연동

1. **GitHub 계정 생성**
   - https://github.com

2. **새 저장소 생성**
   - "New repository" 클릭
   - Repository name: `unmyoung-fortune`
   - Public 또는 Private 선택
   - "Create repository" 클릭

3. **로컬 저장소 연결**
```bash
# 원격 저장소 추가
git remote add origin https://github.com/[사용자명]/unmyoung-fortune.git

# 첫 푸시
git branch -M main
git push -u origin main

# 이후 푸시
git push
```

### 인증 설정

#### Personal Access Token (추천)
```bash
# GitHub에서 토큰 생성
# Settings > Developer settings > Personal access tokens > Generate new token

# 토큰 사용
git push
# Username: [GitHub 사용자명]
# Password: [생성한 토큰]
```

#### SSH 키 (선택)
```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your.email@example.com"

# 공개 키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub에 추가
# Settings > SSH and GPG keys > New SSH key
```

---

## 🎯 .gitignore 설정

프로젝트에 이미 `.gitignore` 파일이 있어야 합니다:

```gitignore
# 의존성
node_modules/
.pnp/
.pnp.js

# 빌드 결과
.next/
out/
build/
dist/

# 환경 변수
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# 로그
*.log
npm-debug.log*
yarn-debug.log*

# 운영체제
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# 테스트
coverage/

# 기타
.cache/
.temp/
```

---

## 🚦 Git 워크플로우 (일상적인 작업)

### 1. 작업 시작
```bash
# 최신 상태 확인
git status

# 변경사항 있으면 커밋
git add .
git commit -m "작업 설명"
```

### 2. 기능 개발
```bash
# 새 브랜치 생성 (선택)
git checkout -b feature/new-feature

# 작업...
# 파일 수정

# 커밋
git add .
git commit -m "feat: 새 기능 추가"
```

### 3. 작업 완료
```bash
# main 브랜치로 전환
git checkout main

# 병합
git merge feature/new-feature

# 푸시
git push
```

---

## 📝 커밋 메시지 규칙

### Conventional Commits

```
<타입>: <제목>

<본문 (선택)>

<푸터 (선택)>
```

### 타입
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드 작업, 패키지 등

### 예시
```bash
git commit -m "feat: 카카오톡 채널 연동 추가"
git commit -m "fix: Hero 섹션 레이아웃 오류 수정"
git commit -m "docs: README 업데이트"
git commit -m "style: 코드 포맷팅"
```

---

## 🆘 문제 해결

### "git: command not found"
```bash
# PATH 확인
echo $PATH

# PowerShell 재시작
# 또는 PC 재부팅
```

### 한글 파일명 깨짐
```bash
git config --global core.quotepath false
```

### 줄바꿈 경고
```bash
git config --global core.autocrlf true
```

### 커밋 메시지 수정
```bash
git commit --amend -m "새 메시지"
```

---

## ✅ 설치 완료 체크리스트

- [ ] Git 다운로드 및 설치
- [ ] Git Bash 또는 PowerShell에서 `git --version` 실행
- [ ] 사용자 이름 설정 (`git config --global user.name`)
- [ ] 이메일 설정 (`git config --global user.email`)
- [ ] 프로젝트 폴더에서 `git init`
- [ ] `.gitignore` 확인
- [ ] `git add .`
- [ ] `git commit -m "초기 커밋"`
- [ ] 완료! 🎉

---

## 🎓 학습 리소스

### 공식 문서
- **Git 공식 문서**: https://git-scm.com/doc
- **Pro Git 책** (무료): https://git-scm.com/book/ko/v2

### 비주얼 가이드
- **Learn Git Branching**: https://learngitbranching.js.org/?locale=ko
- **GitHub Skills**: https://skills.github.com/

### 치트 시트
- **GitHub Cheat Sheet**: https://training.github.com/downloads/github-git-cheat-sheet.pdf

---

**다음 단계**: Git 설치 후 다시 "git을 생성해"라고 요청하시면 자동으로 저장소를 초기화하고 커밋해드리겠습니다! 🚀
