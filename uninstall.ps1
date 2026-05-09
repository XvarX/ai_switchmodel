$ErrorActionPreference = "Stop"

$InstallDir = "$env:USERPROFILE\.claude-switch"
$CmdDir = "$env:USERPROFILE\.claude-switch-cmd"
$ConfigFile = "$env:USERPROFILE\.claude-switch.json"

Write-Host ""
Write-Host "  claude-switch uninstaller"
Write-Host "  ------------------------"
Write-Host ""

# Unlink npm
if (Get-Command cs -ErrorAction SilentlyContinue) {
  Write-Host "  Unlinking npm package..."
  Set-Location $InstallDir
  npm unlink --silent 2>$null; if ($LASTEXITCODE -ne 0) { npm unlink }
}

# Remove install dir
if (Test-Path $InstallDir) {
  Write-Host "  Removing $InstallDir..."
  Remove-Item -Recurse -Force $InstallDir
}

# Remove config
if (Test-Path $ConfigFile) {
  Write-Host "  Removing config file..."
  Remove-Item -Force $ConfigFile
}

# Remove CMD scripts
if (Test-Path $CmdDir) {
  Write-Host "  Removing CMD scripts..."
  Remove-Item -Recurse -Force $CmdDir
}

# Clean PowerShell profile
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
Write-Host "  Note: Remove $CmdDir from PATH manually if needed."
Write-Host ""
