function generateUseFunction(name) {
  return `
use_${name}() {
  [ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"
  eval "$(cs use ${name} --shell bash)"
}`;
}

function generateAllFunctions(providers) {
  const funcs = Object.keys(providers).map(n => generateUseFunction(n));
  return `# >>> claude-switch >>>\n${funcs.join('\n')}\n# <<< claude-switch <<<`;
}

module.exports = { generateUseFunction, generateAllFunctions };
