#!/usr/bin/env bash
set -e

INSTALL_DIR="$HOME/.claude-switch"

echo ""
echo "  claude-switch uninstaller"
echo "  ------------------------"
echo ""

# Unlink npm
if command -v cs &>/dev/null; then
  echo "  Unlinking npm package..."
  cd "$INSTALL_DIR"
  npm unlink --silent 2>/dev/null || npm unlink
fi

# Remove install dir
if [ -d "$INSTALL_DIR" ]; then
  echo "  Removing $INSTALL_DIR..."
  rm -rf "$INSTALL_DIR"
fi

# Remove config
if [ -f "$HOME/.claude-switch.json" ]; then
  echo "  Removing config file..."
  rm -f "$HOME/.claude-switch.json"
fi

# Remove CMD scripts
if [ -d "$HOME/.claude-switch-cmd" ]; then
  echo "  Removing CMD scripts..."
  rm -rf "$HOME/.claude-switch-cmd"
fi

# Clean shell profiles
echo "  Cleaning shell profiles..."
for rc in "$HOME/.bashrc" "$HOME/.bash_profile" "$HOME/.zshrc"; do
  if [ -f "$rc" ]; then
    sed -i '/# >>> claude-switch >>>/,/# <<< claude-switch <<</d' "$rc"
  fi
done

echo ""
echo "  [OK] claude-switch uninstalled!"
echo "  Note: CMD directory was removed from disk. Remove it from PATH manually if needed."
echo ""
