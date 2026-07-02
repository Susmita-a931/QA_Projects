@echo off
setlocal

set "RUNTIME_ROOT=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies"
set "PATH=%RUNTIME_ROOT%\node\bin;%PATH%"
set "PNPM=%RUNTIME_ROOT%\bin\pnpm.cmd"

node --version
echo Opening ShopEase Playwright HTML report...

"%PNPM%" exec playwright show-report evidence/reports/playwright-html
