const readline = require('readline');
const config = require('../config');

function prompt(rl, question, defaultVal) {
  const suffix = defaultVal ? ` [${defaultVal}]` : '';
  return new Promise(resolve => {
    rl.question(`  ${question}${suffix}: `, answer => {
      resolve(answer.trim() || (defaultVal || ''));
    });
  });
}

module.exports = async function(args) {
  const name = args[0];
  if (!name) {
    console.error('  Usage: cs add <name>');
    console.error('  Example: cs add ds');
    process.exit(1);
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    console.error('  Provider name must be alphanumeric (can contain - and _)');
    process.exit(1);
  }

  // Parse --key value style args
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--') && i + 1 < args.length && !args[i + 1].startsWith('--')) {
      flags[args[i].slice(2)] = args[++i];
    }
  }

  let { url, key, sonnet, haiku, opus } = flags;

  // Interactive mode if url or key missing from flags
  if (!url || !key) {
    console.log(`\n  Adding provider: ${name}\n`);
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    if (!url) url = await prompt(rl, 'API Base URL');
    if (!key) key = await prompt(rl, 'API Key');

    const defaults = config.guessDefaults(url);

    if (!sonnet) sonnet = await prompt(rl, 'Sonnet model name', defaults.sonnet);
    if (!haiku) haiku = await prompt(rl, 'Haiku model name', defaults.haiku);
    if (!opus) opus = await prompt(rl, 'Opus model name', defaults.opus);

    rl.close();
  } else {
    // Fill missing model names with guesses
    const defaults = config.guessDefaults(url);
    sonnet = sonnet || defaults.sonnet;
    haiku = haiku || defaults.haiku;
    opus = opus || defaults.opus;
  }

  config.addProvider(name, { url, key, sonnet, haiku, opus });

  console.log(`\n  [OK] Provider "${name}" saved.`);
  console.log('  Run "cs init" to update shell functions.\n');
};
