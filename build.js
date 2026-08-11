#!/usr/bin/env node
/* Assemble src/pages/*.mjs into static HTML. Run: node build.js */
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './src/layout.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, 'src', 'pages');
let n = 0;

for (const f of readdirSync(dir).filter(f => f.endsWith('.mjs')).sort()) {
  const page = (await import(join(dir, f))).default;
  const out = join(here, page.dir, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(page), 'utf8');
  console.log(`  ${(page.dir || '.') + '/index.html'}`);
  n++;
}
console.log(`\n${n} pages built.`);
