# 🚀 개발 서버 독립 실행 가이드

## 방법 1: Windows PowerShell/CMD에서 직접 실행 (추천)

### 단계별 실행

1. **Windows 검색**에서 `PowerShell` 또는 `명령 프롬프트(CMD)` 실행
   - `Win + R` → `powershell` 입력 → Enter

2. **프로젝트 폴더로 이동**
```powershell
cd C:\아빠\사주\강의\코딩\unmyoung
```

3. **개발 서버 시작**
```powershell
npm run dev
```

4. **결과 확인**
```
▲ Next.js 16.1.1 (Turbopack)
- Local:   http://localhost:3000
✓ Ready
```

5. **이제 Cursor를 종료해도 서버는 계속 실행됩니다!**

### ⚠️ 서버 중지 방법
- PowerShell/CMD 창에서 `Ctrl + C`

---

## 방법 2: 배치 파일로 간편 실행 (더 쉬움!)

프로젝트 폴더에 `start-server.bat` 파일이 생성되었습니다.

### 사용 방법
1. **`start-server.bat`** 파일을 더블클릭
2. 자동으로 서버 실행
3. Cursor 종료해도 계속 실행
4. 창을 닫으면 서버 중지

---

## 방법 3: PM2로 백그라운드 실행 (프로덕션급)

### 설치
```powershell
npm install -g pm2
```

### 실행
```powershell
pm2 start npm --name "unmyoung-dev" -- run dev
```

### 관리 명령어
```powershell
pm2 list              # 실행 중인 프로세스 확인
pm2 stop unmyoung-dev # 서버 중지
pm2 restart unmyoung-dev # 서버 재시작
pm2 logs unmyoung-dev    # 로그 보기
pm2 delete unmyoung-dev  # 프로세스 삭제
```

### 장점
- PC 재부팅해도 자동 시작
- 로그 관리
- 에러 시 자동 재시작

---

## 브라우저 접속 주소

### 로컬 (같은 PC)
```
http://localhost:3000
```

### 네트워크 (다른 기기)
```
http://192.168.45.66:3000
```
*네트워크 IP는 매번 다를 수 있습니다. 터미널에서 확인하세요.*

---

## 문제 해결

### 포트 3000이 이미 사용 중일 때
```powershell
# 포트 3000 사용 프로세스 확인
netstat -ano | findstr :3000

# PID 번호 확인 후 종료
taskkill /F /PID [PID번호]
```

### 서버가 시작되지 않을 때
1. Node.js 버전 확인: `node -v` (v18 이상 필요)
2. 의존성 재설치: `npm install`
3. 캐시 삭제: `npm run clean` (있다면)

---

## 💡 추천 방법

**일상적인 개발**: 방법 1 (독립 PowerShell)
**빠른 실행**: 방법 2 (배치 파일)
**프로덕션 테스트**: 방법 3 (PM2)

---

## 참고사항

- ✅ Cursor 종료해도 서버는 계속 실행됩니다
- ✅ 코드 변경 시 자동으로 새로고침됩니다 (Hot Reload)
- ✅ 여러 브라우저/탭에서 동시 접속 가능
- ⚠️ 서버 터미널 창을 닫으면 서버가 중지됩니다
- ⚠️ PC 종료 시 서버도 종료됩니다 (PM2 제외)
