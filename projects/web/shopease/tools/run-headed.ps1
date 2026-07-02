$ErrorActionPreference = "Stop"

$runtimeRoot = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies"
$nodeBin = Join-Path $runtimeRoot "node\bin"
$pnpm = Join-Path $runtimeRoot "bin\pnpm.cmd"

$env:Path = "$nodeBin;$env:Path"

Write-Host "Node:" (& node --version)
Write-Host "Running ShopEase tests..."

if ($args.Count -gt 0) {
  & $pnpm exec playwright test @args
} else {
  & $pnpm exec playwright test --headed
}
