const fs = require('fs');
const path = require('path');
const os = require('os');
const config = require('../config');
const bashGen = require('../shells/bash');
const psGen = require('../shells/powershell');
const cmdGen = require('../shells/cmd');

const BEGIN_MARKER = '# >>> claude-switch >>>';
const END_MARKER = '# <<< claude-switch <<<';

function replaceBlock(content, newBlock) {
  const beginIdx = content.indexOf(BEGIN_MARKER);
  const endIdx = content.indexOf(END_MARKER);
  if (beginIdx !== -1 && endIdx !== -1) {
    return content.slice(0, beginIdx) + newBlock + content.slice(endIdx + END_MARKER.length);
  }
  return content.trimEnd() + '\n\n' + newBlock + '\n';
}

function getShellFromArgs(args) {
  const idx = args.indexOf('--shell');
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return null;
}

function detectShells() {
  const shells = [];
  if (process.env.SHELL) shells.push('bash');
  if (process.env.PSModulePath) shells.push('powershell');
  shells.push('cmd');
  return shells.length > 0 ? shells : ['bash'];
}

module.exports = function(args) {
  const providers = config.listProviders();
  const names = Object.keys(providers);
  if (names.length === 0) {
    console.log('  No providers configured. Run "cs add <name>" first.');
    return;
  }

  const requested = getShellFromArgs(args);
  const shells = requested ? [requested] : detectShells();

  if (shells.includes('bash')) {
    const rcFiles = [
      path.join(os.homedir(), '.bashrc'),
      path.join(os.homedir(), '.bash_profile'),
      path.join(os.homedir(), '.zshrc'),
    ].filter(f => {
      if (process.platform === 'win32') return fs.existsSync(f);
      return true;
    });

    // On Windows, write to .bashrc even if it doesn't exist (for Git Bash)
    if (process.platform === 'win32' && !rcFiles.length) {
      rcFiles.push(path.join(os.homedir(), '.bashrc'));
    }

    const block = bashGen.generateAllFunctions(providers);
    for (const rcFile of rcFiles) {
      let content = '';
      if (fs.existsSync(rcFile)) {
        content = fs.readFileSync(rcFile, 'utf8');
      }
      content = replaceBlock(content, block);
      fs.writeFileSync(rcFile, content, 'utf8');
      console.log(`  ✓ Bash functions written to ${rcFile}`);
    }
  }

  if (shells.includes('powershell')) {
    const profileDir = path.join(
      process.env.USERPROFILE || os.homedir(),
      'Documents', 'WindowsPowerShell'
    );
    const profileFile = path.join(profileDir, 'Microsoft.PowerShell_profile.ps1');

    fs.mkdirSync(profileDir, { recursive: true });

    let content = '';
    if (fs.existsSync(profileFile)) {
      content = fs.readFileSync(profileFile, 'utf8');
    }
    const block = psGen.generateAllFunctions(providers);
    content = replaceBlock(content, block);
    fs.writeFileSync(profileFile, content, 'utf8');
    console.log(`  ✓ PowerShell functions written to ${profileFile}`);
  }

  if (shells.includes('cmd')) {
    const dir = cmdGen.generateAllFiles(providers);
    console.log(`  ✓ CMD scripts written to ${dir}`);
    console.log(`    Add this directory to your PATH: ${dir}`);
  }

  console.log('\n  Restart your terminal or source your profile for changes to take effect.\n');
};
