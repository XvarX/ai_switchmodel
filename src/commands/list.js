const config = require('../config');

module.exports = function() {
  const providers = config.listProviders();
  const names = Object.keys(providers);

  if (names.length === 0) {
    console.log('  No providers configured. Run "cs add <name>" to add one.');
    return;
  }

  console.log('  Providers:\n');
  for (const name of names) {
    const p = providers[name];
    console.log(`    ${name}  →  ${p.url}  (${p.sonnet})`);
  }
  console.log();
};
