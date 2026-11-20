// Checks that the site only shows finished projects.
//
// Taylor's rule (Nov 2026): only finished work goes on the site; planned
// projects stay in Gideon until they're ready. This fails if a tile, panel,
// Network-desk paper, link or chat answer points at a project that isn't in
// FINISHED below, if a tile carries an unfinished label ("In design",
// "Early concept", "Coming soon" ...), or if serious.html has drifted from
// index.html.
//
// When a project really is finished and Taylor wants it on the site, add its
// key here in the same change that adds its tile.
//
// Run: node .github/check-site.mjs   (no install needed; exits 1 on a problem)
// It lives in .github so GitHub Pages doesn't publish it.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const FINISHED = new Set([
  'mach1', 'archive', 'gideon', 'forge', 'resilife', 'quotes', 'pb', 'redstone', 'lidi',
]);

// Words that mark a project as not done yet. The page must never label a tile
// or panel with them; if it needs to, the project isn't ready for the site.
const UNFINISHED_LABELS = /\b(in design|early concept|concept stage|coming soon|in development|under construction|work in progress|planned|not started)\b/i;

// Tile class names that are parts of a tile, not a project.
const TILE_PARTS = new Set(['bg', 'kicker', 'label', 'name', 'overlay', 'video', 'icon', 'img', 'art', 'glyph']);
// Tile class names for tiles that aren't a project panel. 'quote' is the
// quote-calculators tile (its panel key is 'quotes').
const TILE_ALIASES = { quote: 'quotes', commercial: null };

// Hash links that aren't projects (sections and filters).
const NOT_PROJECTS = new Set([
  'top', 'main', 'grid', 'contact', 'commercial', 'about', 'bio',
  'hardware', 'software', 'marketing', 'venture', 'all',
]);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(root, f), 'utf8');
const problems = [];
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

const seen = new Set();
function checkKey(file, text, index, key, where) {
  if (key == null || FINISHED.has(key)) return;
  // One report per project, file and kind is enough to find it.
  const id = `${file}|${where}|${key}`;
  if (seen.has(id)) return;
  seen.add(id);
  problems.push(`${file}:${lineOf(text, index)}: ${where} '${key}' isn't a finished project. ` +
    `Only finished work goes on the site; planned projects stay in Gideon. ` +
    `If it is finished, add '${key}' to FINISHED in .github/check-site.mjs.`);
}

function each(text, re, fn) {
  for (const m of text.matchAll(re)) fn(m);
}

// --- The landing page (and its copy) ---
const index = read('index.html');
const serious = read('serious.html');
if (index !== serious) {
  problems.push('serious.html is not an exact copy of index.html. Run: cp index.html serious.html');
}

for (const file of ['index.html', 'network.html']) {
  const text = read(file);

  each(text, /data-project="([a-z0-9]+)"/g, (m) => checkKey(file, text, m.index, m[1], 'Tile'));

  each(text, /class="tile\b([^"]*)"/g, (m) => {
    for (const cls of m[1].trim().split(/\s+/)) {
      const t = /^tile-([a-z0-9]+)$/.exec(cls);
      if (!t || TILE_PARTS.has(t[1])) continue;
      const key = t[1] in TILE_ALIASES ? TILE_ALIASES[t[1]] : t[1];
      checkKey(file, text, m.index, key, 'Tile');
    }
  });

  // CSS for a tile that isn't on the page is how a removed project creeps back.
  each(text, /\.tile-([a-z0-9]+)\b/g, (m) => {
    if (TILE_PARTS.has(m[1])) return;
    const key = m[1] in TILE_ALIASES ? TILE_ALIASES[m[1]] : m[1];
    checkKey(file, text, m.index, key, 'Tile style');
  });

  each(text, /(?:href="|index\.html)#([a-z0-9]+)/g, (m) => {
    if (NOT_PROJECTS.has(m[1])) return;
    checkKey(file, text, m.index, m[1], 'Link to project');
  });

  // Network desk papers: project: { key: 'x', ... }
  each(text, /project:\s*\{\s*key:\s*'([^']*)'/g, (m) => checkKey(file, text, m.index, m[1], 'Desk paper'));

  // Status labels drawn on tiles with CSS (content: '...') or set on panels (status: '...').
  each(text, /(?:content|status):\s*'([^']*)'/g, (m) => {
    if (UNFINISHED_LABELS.test(m[1])) {
      problems.push(`${file}:${lineOf(text, m.index)}: label '${m[1]}' marks a project as unfinished. ` +
        `Only finished work goes on the site; planned projects stay in Gideon.`);
    }
  });

  // Visible tile labels in the markup.
  each(text, /<(?:span|p|div)[^>]*class="[^"]*tile-(?:kicker|label|name)[^"]*"[^>]*>([^<]*)</g, (m) => {
    if (UNFINISHED_LABELS.test(m[1])) {
      problems.push(`${file}:${lineOf(text, m.index)}: tile text '${m[1].trim()}' marks a project as unfinished.`);
    }
  });
}

// The project panels: const projects = { key: { ... }, ... };
{
  const start = index.indexOf('const projects = {');
  if (start === -1) {
    problems.push("index.html: couldn't find 'const projects = {' (the project panels). Update .github/check-site.mjs if it moved.");
  } else {
    const end = index.indexOf('\n};', start);
    const body = index.slice(start, end === -1 ? undefined : end);
    each(body, /\n {2}([A-Za-z0-9_]+)\s*:\s*\{/g, (m) => checkKey('index.html', index, start + m.index + 1, m[1], 'Project panel'));
  }
}

// --- Speak to Gideon: answers that open a panel ---
{
  const file = 'assets/gideon-answers.js';
  const text = existsSync(join(root, file)) ? read(file) : '';
  each(text, /\bopen:\s*'([^']*)'/g, (m) => checkKey(file, text, m.index, m[1], 'Chat answer opens'));
}

// --- Search engines ---
{
  const file = 'sitemap.xml';
  const text = read(file);
  each(text, /<loc>[^<#]*#([a-z0-9]+)<\/loc>/g, (m) => {
    if (!NOT_PROJECTS.has(m[1])) checkKey(file, text, m.index, m[1], 'Sitemap entry');
  });
}

if (problems.length) {
  console.error(`The site would show something that isn't finished (${problems.length} problem${problems.length > 1 ? 's' : ''}):\n`);
  for (const p of problems) console.error('- ' + p);
  process.exit(1);
}
console.log(`OK: the site only shows finished projects (${[...FINISHED].join(', ')}).`);
