@echo off
chcp 65001 >nul
title 프로젝트 백업

echo ========================================
echo    운명테라피 프로젝트 백업
echo ========================================
echo.

set BACKUP_DIR=..\unmyoung-backup-%date:~0,4%%date:~5,2%%date:~8,2%-%time:~0,2%%time:~3,2%%time:~6,2%
set BACKUP_DIR=%BACKUP_DIR: =0%

echo 백업 폴더: %BACKUP_DIR%
echo.
echo 백업 중...
echo.

cd /d "%~dp0"

xcopy /E /I /Y /Q * "%BACKUP_DIR%" 2>nul

if errorlevel 0 (
    echo ✓ 백업 완료!
    echo.
    echo 백업 위치: %BACKUP_DIR%
    echo.
) else (
    echo ✗ 백업 실패
    echo.
)

echo 백업에 포함된 파일:
echo - 소스 코드 (app/, public/)
echo - 설정 파일 (package.json, tsconfig.json 등)
echo - 문서 파일 (*.md)
echo - 배치 파일 (*.bat)
echo - 영상 파일 (public/videos/)
echo.
echo 제외된 항목:
echo - node_modules/ (의존성)
echo - .next/ (빌드 캐시)
echo.

pause
