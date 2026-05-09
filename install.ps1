$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "  claude-switch installer"
Write-Host "  ----------------------"
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "  [ERROR] node is required but not installed." -ForegroundColor Red
  exit 1
}

Set-Location $ScriptDir
npm link

Write-Host ""
Write-Host "  [OK] claude-switch installed!" -ForegroundColor Green
Write-Host ""
Write-Host "  Quick start:"
Write-Host "    cs add myprovider"
Write-Host "    restart terminal"
Write-Host "    use_myprovider"
Write-Host ""
