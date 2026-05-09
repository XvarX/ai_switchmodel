const config = require('../config');

function getShell(args) {
  const idx = args.indexOf('--shell');
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  // Auto-detect
  if (process.env.SHELL) return 'bash';
  if (process.env.PSModulePath) return 'powershell';
  return 'bash';
}

module.exports = function(args) {
  const name = args[0];
  if (!name) {
    console.error('  Usage: cs use <name> [--shell bash|powershell|cmd]');
    process.exit(1);
  }

  const provider = config.getProvider(name);
  if (!provider) {
    console.error(`  Provider "${name}" not found. Run "cs list" to see available providers.`);
    process.exit(1);
  }

  const shell = getShell(args);

  if (shell === 'bash') {
    console.log(`export ANTHROPIC_BASE_URL="${provider.url}"`);
    console.log(`export ANTHROPIC_API_KEY="${provider.key}"`);
    console.log(`export ANTHROPIC_DEFAULT_SONNET_MODEL="${provider.sonnet}"`);
    console.log(`export ANTHROPIC_DEFAULT_HAIKU_MODEL="${provider.haiku}"`);
    console.log(`export ANTHROPIC_DEFAULT_OPUS_MODEL="${provider.opus}"`);
    console.log(`echo '  ✓ Switched to ${name} (${provider.sonnet} @ ${provider.url})'`);
  } else if (shell === 'powershell') {
    console.log(`$env:ANTHROPIC_BASE_URL = "${provider.url}"`);
    console.log(`$env:ANTHROPIC_API_KEY = "${provider.key}"`);
    console.log(`$env:ANTHROPIC_DEFAULT_SONNET_MODEL = "${provider.sonnet}"`);
    console.log(`$env:ANTHROPIC_DEFAULT_HAIKU_MODEL = "${provider.haiku}"`);
    console.log(`$env:ANTHROPIC_DEFAULT_OPUS_MODEL = "${provider.opus}"`);
    console.log(`Write-Host "  ✓ Switched to ${name} (${provider.sonnet} @ ${provider.url})"`);
  } else if (shell === 'cmd') {
    console.log(`set ANTHROPIC_BASE_URL=${provider.url}`);
    console.log(`set ANTHROPIC_API_KEY=${provider.key}`);
    console.log(`set ANTHROPIC_DEFAULT_SONNET_MODEL=${provider.sonnet}`);
    console.log(`set ANTHROPIC_DEFAULT_HAIKU_MODEL=${provider.haiku}`);
    console.log(`set ANTHROPIC_DEFAULT_OPUS_MODEL=${provider.opus}`);
    console.log(`echo   Switched to ${name} (${provider.sonnet} @ ${provider.url})`);
  }
};
