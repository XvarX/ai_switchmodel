const config = require('../config');

module.exports = function(args) {
  const name = args[0];
  if (!name) {
    console.error('  Usage: cs remove <name>');
    process.exit(1);
  }

  if (!config.getProvider(name)) {
    console.error(`  Provider "${name}" not found.`);
    process.exit(1);
  }

  config.removeProvider(name);
  console.log(`  [OK] Provider "${name}" removed.`);
};
