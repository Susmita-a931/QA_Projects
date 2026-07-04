$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Push-Location $projectRoot

$runtimeRoot = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies"
$nodeBin = Join-Path $runtimeRoot "node\bin"
$pnpm = Join-Path $runtimeRoot "bin\pnpm.cmd"

$env:Path = "$nodeBin;$env:Path"

Write-Host "Node:" (& node --version)
Write-Host "Running ShopEase page-by-page demo..."

& $pnpm exec playwright test --config=playwright.demo.config.ts --headed

Pop-Location
