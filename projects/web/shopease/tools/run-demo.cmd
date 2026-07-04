@echo off
setlocal

pushd "%~dp0.."

set "RUNTIME_ROOT=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies"
set "PATH=%RUNTIME_ROOT%\node\bin;%PATH%"
set "PNPM=%RUNTIME_ROOT%\bin\pnpm.cmd"

node --version
echo Running ShopEase page-by-page demo...

"%PNPM%" exec playwright test --config=playwright.demo.config.ts --headed

popd
