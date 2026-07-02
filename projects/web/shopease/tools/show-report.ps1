$ErrorActionPreference = "Stop"

$runtimeRoot = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies"
$nodeBin = Join-Path $runtimeRoot "node\bin"
$pnpm = Join-Path $runtimeRoot "bin\pnpm.cmd"

$env:Path = "$nodeBin;$env:Path"

Write-Host "Node:" (& node --version)
Write-Host "Opening ShopEase Playwright HTML report..."

& $pnpm exec playwright show-report evidence/reports/playwright-html
