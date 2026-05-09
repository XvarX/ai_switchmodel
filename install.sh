#!/usr/bin/env bash
set -e

INSTALL_DIR="$HOME/.claude-switch"
REPO="https://github.com/XvarX/ai_switchmodel.git"

echo ""
echo "  claude-switch installer"
echo "  ----------------------"
echo ""

# Check dependencies
if ! command -v git &>/dev/null; then
  echo "  [ERROR] git is required but not installed."
  exit 1
fi

if ! command -v node &>/dev/null; then
  echo "  [ERROR] node is required but not installed."
  exit 1
fi

# Remove old install if exists
if [ -d "$INSTALL_DIR" ]; then
  echo "  Removing previous installation..."
  rm -rf "$INSTALL_DIR"
fi

# Clone
echo "  Cloning repository..."
git clone "$REPO" "$INSTALL_DIR" --quiet

# Link globally
echo "  Installing globally..."
cd "$INSTALL_DIR"
npm link --silent 2>/dev/null || npm link

echo ""
echo "  [OK] claude-switch installed!"
echo ""
echo "  Quick start:"
echo "    cs add myprovider        # add a provider"
echo "    cs init                  # install shell functions"
echo "    restart terminal"
echo "    use_myprovider           # switch!"
echo ""
