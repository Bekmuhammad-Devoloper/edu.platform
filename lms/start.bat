@echo off
cd /d "%~dp0"
start "" http://localhost:3000
node src\server.js
pause
