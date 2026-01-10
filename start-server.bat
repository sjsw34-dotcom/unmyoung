@echo off
chcp 65001 >nul
title 사주 분석 개발 서버

echo ========================================
echo    사주 분석 웹사이트 개발 서버
echo ========================================
echo.
echo 서버를 시작합니다...
echo.

cd /d "%~dp0"

echo 현재 위치: %CD%
echo.

npm run dev

pause
