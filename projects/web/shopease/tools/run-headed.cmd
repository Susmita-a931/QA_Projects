@echo off
setlocal

set "RUNTIME_ROOT=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies"
set "PATH=%RUNTIME_ROOT%\node\bin;%PATH%"
set "PNPM=%RUNTIME_ROOT%\bin\pnpm.cmd"

node --version
echo Running ShopEase tests...

if "%~1"=="" (
  "%PNPM%" exec playwright test --headed
) else (
  "%PNPM%" exec playwright test %*
)
