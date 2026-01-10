@echo off
chcp 65001 >nul
title 서버 중지

echo ========================================
echo    개발 서버 중지
echo ========================================
echo.
echo 포트 3000을 사용하는 프로세스를 찾습니다...
echo.

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    set PID=%%a
    goto :found
)

echo 실행 중인 서버를 찾을 수 없습니다.
goto :end

:found
echo 프로세스 ID: %PID%
echo 서버를 중지합니다...
taskkill /F /PID %PID%
echo.
echo 서버가 중지되었습니다!

:end
echo.
pause
