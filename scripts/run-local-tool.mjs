import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const entrypoints = {
  tsc: resolve(root, 'node_modules/typescript/lib/tsc.js'),
  vite: resolve(root, 'node_modules/vite/bin/vite.js'),
};

const env = { ...process.env };
const args = process.argv.slice(2);

while (args[0] && /^[A-Za-z_][A-Za-z0-9_]*=/.test(args[0])) {
  const [key, ...valueParts] = args.shift().split('=');
  env[key] = valueParts.join('=');
}

const tool = args.shift();

if (!tool || !entrypoints[tool]) {
  console.error(`Usage: node scripts/run-local-tool.mjs [KEY=value ...] <${Object.keys(entrypoints).join('|')}> [...args]`);
  process.exit(2);
}

const entrypoint = entrypoints[tool];

if (!existsSync(entrypoint)) {
  console.error(`Missing local ${tool} entrypoint: ${entrypoint}`);
  console.error('Run npm ci --ignore-scripts in this folder to restore node_modules.');
  process.exit(127);
}

const result = spawnSync(process.execPath, [entrypoint, ...args], {
  cwd: root,
  env,
  stdio: 'inherit',
  shell: false,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
