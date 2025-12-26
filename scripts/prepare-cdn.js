#!/usr/bin/env node
import { cpSync, mkdirSync, existsSync, readdirSync, readFileSync } from 'fs';
import { resolve, join } from 'path';

/**
 * Copy all built blocks to public/ directory for Vercel deployment.
 *
 * Structure:
 *   packages/blocks/hero/dist/ → public/@cmssy/blocks.hero/1.0.0/
 */

const publicDir = resolve(process.cwd(), 'public');

// Clean and create public directory
if (existsSync(publicDir)) {
  console.log('Cleaning public/ directory...');
}
mkdirSync(publicDir, { recursive: true });

// Copy blocks
const blocksDir = resolve(process.cwd(), 'packages/blocks');
const blocks = readdirSync(blocksDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`\nCopying ${blocks.length} blocks to public/...\n`);

for (const blockName of blocks) {
  const blockPath = join(blocksDir, blockName);
  const distPath = join(blockPath, 'dist');

  if (!existsSync(distPath)) {
    console.log(`⚠️  Skipping ${blockName} - no dist/ found`);
    continue;
  }

  // Read version from package.json
  const packageJson = JSON.parse(
    readFileSync(join(blockPath, 'package.json'), 'utf8')
  );
  const version = packageJson.version;
  const fullName = packageJson.name; // e.g., @cmssy/blocks.hero

  // Create destination: public/@cmssy/blocks.hero/1.0.0/
  const destPath = join(publicDir, fullName, version);
  mkdirSync(destPath, { recursive: true });

  // Copy dist/ contents
  cpSync(distPath, destPath, { recursive: true });

  console.log(`✅ ${fullName}@${version}`);
}

console.log(`\n✅ CDN preparation complete! Files in public/`);
