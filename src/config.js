const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_PATH = path.join(os.homedir(), '.claude-switch.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch {
    return { providers: {} };
  }
}

function save(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n');
}

function addProvider(name, { url, key, sonnet, haiku, opus }) {
  const config = load();
  config.providers[name] = { url, key, sonnet, haiku, opus };
  save(config);
}

function removeProvider(name) {
  const config = load();
  delete config.providers[name];
  save(config);
}

function getProvider(name) {
  const config = load();
  return config.providers[name] || null;
}

function listProviders() {
  const config = load();
  return config.providers;
}

function guessDefaults(url) {
  const lower = url.toLowerCase();
  if (lower.includes('deepseek')) {
    return { sonnet: 'deepseek-chat', haiku: 'deepseek-chat', opus: 'deepseek-chat' };
  }
  if (lower.includes('bigmodel') || lower.includes('glm')) {
    return { sonnet: 'glm-4', haiku: 'glm-4-flash', opus: 'glm-4-plus' };
  }
  return { sonnet: '', haiku: '', opus: '' };
}

module.exports = { CONFIG_PATH, load, save, addProvider, removeProvider, getProvider, listProviders, guessDefaults };
