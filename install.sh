#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  claude-switch installer"
echo "  ----------------------"
echo ""

if ! command -v node &>/dev/null; then
  echo "  [ERROR] node is required but not installed."
  exit 1
fi

cd "$SCRIPT_DIR"
npm link

echo ""
echo "  [OK] claude-switch installed!"
echo ""
echo "  Quick start:"
echo "    cs add myprovider"
echo "    restart terminal"
echo "    use_myprovider"
echo ""
