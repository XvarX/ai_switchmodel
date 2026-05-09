#!/usr/bin/env node

const commands = {
  add: require('../src/commands/add'),
  list: require('../src/commands/list'),
  remove: require('../src/commands/remove'),
  use: require('../src/commands/use'),
  init: require('../src/commands/init'),
};

function showHelp() {
  console.log(`
  claude-switch (cs) — Switch Claude Code API providers

  Usage:
    cs add <name>            Add a provider (interactive)
    cs add <name> [options]  Add a provider with args
      Options: --url, --key, --sonnet, --haiku, --opus
    cs list                  List all providers
    cs remove <name>         Remove a provider
    cs use <name> [--shell bash|powershell|cmd]
                             Output env code for a shell
    cs init [--shell bash|powershell|cmd|all]
                             Install shell functions

  Examples:
    cs add ds
    cs add glm --url https://open.bigmodel.cn/api/paas/v4 --key xxx
    cs init
    use_ds
  `);
}

const args = process.argv.slice(2);
const cmd = args[0];

if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
  showHelp();
  process.exit(0);
}

if (!commands[cmd]) {
  console.error(`Unknown command: ${cmd}`);
  console.error('Run "cs help" for usage.');
  process.exit(1);
}

commands[cmd](args.slice(1));
