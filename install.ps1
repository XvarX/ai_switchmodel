$ErrorActionPreference = "Stop"

$InstallDir = "$env:USERPROFILE\.claude-switch"
$Repo = "https://github.com/XvarX/ai_switchmodel.git"

Write-Host ""
Write-Host "  claude-switch installer"
Write-Host "  ----------------------"
Write-Host ""

# Check dependencies
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "  [ERROR] git is required but not installed." -ForegroundColor Red
  exit 1
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "  [ERROR] node is required but not installed." -ForegroundColor Red
  exit 1
}

# Remove old install if exists
if (Test-Path $InstallDir) {
  Write-Host "  Removing previous installation..."
  Remove-Item -Recurse -Force $InstallDir
}

# Clone
Write-Host "  Cloning repository..."
git clone $Repo $InstallDir --quiet

# Link globally
Write-Host "  Installing globally..."
Set-Location $InstallDir
npm link --silent 2>$null; if ($LASTEXITCODE -ne 0) { npm link }

Write-Host ""
Write-Host "  [OK] claude-switch installed!" -ForegroundColor Green
Write-Host ""
Write-Host "  Quick start:"
Write-Host "    cs add myprovider        # add a provider"
Write-Host "    cs init                  # install shell functions"
Write-Host "    restart terminal"
Write-Host "    use_myprovider           # switch!"
Write-Host ""
