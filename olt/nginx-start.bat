
@REM cd /d %cd%
call nginx-stop.bat
nginx -c olt-reverse-proxy.conf -p .
pause
