@echo off
chcp 65001 >nul
echo Aside를 완전히 종료한 상태에서 실행하세요.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0apply-ko-patch-v2.ps1"
echo.
pause
