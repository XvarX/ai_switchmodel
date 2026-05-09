function generateUseFunction(name) {
  return `
function use_${name} {
  Invoke-Expression (cs use ${name} --shell powershell)
}`;
}

function generateAllFunctions(providers) {
  const funcs = Object.keys(providers).map(n => generateUseFunction(n));
  return `# >>> claude-switch >>>\n${funcs.join('\n')}\n# <<< claude-switch <<<`;
}

module.exports = { generateUseFunction, generateAllFunctions };
