#!/usr/bin/env node
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { spawn } from 'child_process';

/**
 * Build all blocks in packages/blocks/
 */

const blocksDir = resolve(process.cwd(), 'packages/blocks');

const buildPackage = (packageName) => {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [
      'scripts/build-block.js',
      `packages/blocks/${packageName}`
    ], {
      stdio: 'inherit',
      shell: true,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build failed for ${packageName}`));
      }
    });
  });
};

const buildAll = async () => {
  console.log('Building all blocks...\n');

  const packages = readdirSync(blocksDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const pkg of packages) {
    await buildPackage(pkg);
  }

  console.log('\n✅ All blocks built successfully!');
};

buildAll().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
