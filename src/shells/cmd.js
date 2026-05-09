const fs = require('fs');
const path = require('path');
const os = require('os');

function generateCmdFile(name, provider) {
  const lines = [
    '@echo off',
    `set ANTHROPIC_BASE_URL=${provider.url}`,
    `set ANTHROPIC_AUTH_TOKEN=${provider.key}`,
    `set ANTHROPIC_MODEL=${provider.model || ''}`,
    `set ANTHROPIC_DEFAULT_SONNET_MODEL=${provider.sonnet}`,
    `set ANTHROPIC_DEFAULT_HAIKU_MODEL=${provider.haiku}`,
    `set ANTHROPIC_DEFAULT_OPUS_MODEL=${provider.opus}`,
    `echo   Switched to ${name} (${provider.sonnet} @ ${provider.url})`,
  ];
  return lines.join('\n') + '\n';
}

function getCmdDir() {
  return path.join(os.homedir(), '.claude-switch-cmd');
}

function generateAllFiles(providers) {
  const dir = getCmdDir();
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, provider] of Object.entries(providers)) {
    fs.writeFileSync(path.join(dir, `use_${name}.cmd`), generateCmdFile(name, provider));
  }
  // Clean up old .cmd files for removed providers
  for (const file of fs.readdirSync(dir)) {
    const match = file.match(/^use_(.+)\.cmd$/);
    if (match && !providers[match[1]]) {
      fs.unlinkSync(path.join(dir, file));
    }
  }
  return dir;
}

module.exports = { generateCmdFile, generateAllFiles, getCmdDir };
