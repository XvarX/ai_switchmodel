#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  claude-switch installer"
echo "  ----------------------"
echo ""

# Load nvm if available
NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

if ! command -v node >/dev/null 2>&1; then
  echo "  [ERROR] node is required but not installed."
  exit 1
fi

cd "$SCRIPT_DIR"
npm link

echo ""
echo "  [OK] claude-switch installed!"
echo ""
echo "  Please run:  . ~/.bashrc"
echo "  Or open a new terminal."
echo ""
