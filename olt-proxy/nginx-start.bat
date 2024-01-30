
@REM cd /d %cd%
call nginx-stop.bat
nginx -c nginx-olt-reverse-proxy.conf -p .
pause
