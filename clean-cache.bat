@echo off
chcp 65001 >nul
title 캐시 삭제

echo ========================================
echo    Next.js 캐시 삭제
echo ========================================
echo.
echo .next 폴더를 삭제합니다...
echo.

cd /d "%~dp0"

if exist .next (
    rmdir /s /q .next
    echo ✓ 캐시 삭제 완료!
) else (
    echo 캐시 폴더가 없습니다.
)

echo.
echo 서버를 재시작하세요: npm run dev
echo.
pause
