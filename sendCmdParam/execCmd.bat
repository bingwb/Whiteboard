@echo off
powershell.exe -ExecutionPolicy Bypass -File "%~dp0cmd\boot.ps1" -CmdParam "%~1"
pause
