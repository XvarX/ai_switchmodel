#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  claude-switch uninstaller"
echo "  ------------------------"
echo ""

cd "$SCRIPT_DIR"
npm unlink 2>/dev/null || true

if [ -f "$HOME/.claude-switch.json" ]; then
  echo "  Removing config file..."
  rm -f "$HOME/.claude-switch.json"
fi

if [ -d "$HOME/.claude-switch-cmd" ]; then
  echo "  Removing CMD scripts..."
  rm -rf "$HOME/.claude-switch-cmd"
fi

echo "  Cleaning shell profiles..."
for rc in "$HOME/.bashrc" "$HOME/.bash_profile" "$HOME/.zshrc"; do
  if [ -f "$rc" ]; then
    sed -i '/# >>> claude-switch >>>/,/# <<< claude-switch <<</d' "$rc"
  fi
done

echo ""
echo "  [OK] claude-switch uninstalled!"
echo ""
