$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$CmdDir = "$env:USERPROFILE\.claude-switch-cmd"
$ConfigFile = "$env:USERPROFILE\.claude-switch.json"

Write-Host ""
Write-Host "  claude-switch uninstaller"
Write-Host "  ------------------------"
Write-Host ""

Set-Location $ScriptDir
npm unlink 2>$null

if (Test-Path $ConfigFile) {
  Write-Host "  Removing config file..."
  Remove-Item -Force $ConfigFile
}

if (Test-Path $CmdDir) {
  Write-Host "  Removing CMD scripts..."
  Remove-Item -Recurse -Force $CmdDir
}

$profileFile = "$env:USERPROFILE\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1"
if (Test-Path $profileFile) {
  Write-Host "  Cleaning PowerShell profile..."
  $content = Get-Content $profileFile -Raw
  $pattern = '(?s)# >>> claude-switch >>>.*?# <<< claude-switch <<<'
  $content = $content -replace $pattern, ''
  $content = $content.TrimEnd() + "`n"
  Set-Content $profileFile $content -NoNewline
}

Write-Host ""
Write-Host "  [OK] claude-switch uninstalled!" -ForegroundColor Green
Write-Host ""
