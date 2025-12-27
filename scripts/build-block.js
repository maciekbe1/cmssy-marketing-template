#!/usr/bin/env node
import esbuild from 'esbuild';
import { resolve } from 'path';
import { existsSync } from 'fs';

/**
 * Build a single block package to ESM bundle.
 *
 * Usage:
 *   node scripts/build-block.js packages/blocks/hero
 */

const packagePath = process.argv[2];

if (!packagePath) {
  console.error('Usage: node scripts/build-block.js <package-path>');
  process.exit(1);
}

const absolutePath = resolve(process.cwd(), packagePath);

if (!existsSync(absolutePath)) {
  console.error(`Package not found: ${absolutePath}`);
  process.exit(1);
}

const buildBlock = async () => {
  console.log(`Building block at ${packagePath}...`);

  const srcPath = resolve(absolutePath, 'src');
  const distPath = resolve(absolutePath, 'dist');

  // Check if src/index.tsx exists
  const entryPoint = resolve(srcPath, 'index.tsx');
  if (!existsSync(entryPoint)) {
    console.error(`Entry point not found: ${entryPoint}`);
    process.exit(1);
  }

  try {
    // Build JS bundle (ESM format, fully bundled without externals)
    await esbuild.build({
      entryPoints: [entryPoint],
      bundle: true,
      format: 'esm',
      outfile: resolve(distPath, 'index.js'),
      // Don't externalize React - bundle it completely for now (MVP)
      // In production, we'll use import maps for better caching
      jsx: 'transform', // Use transform instead of automatic to avoid jsx-runtime imports
      minify: true,
      sourcemap: true,
      target: 'es2020',
    });

    console.log('✅ JavaScript bundle built');

    // Build CSS if exists
    const cssEntry = resolve(srcPath, 'index.css');
    if (existsSync(cssEntry)) {
      await esbuild.build({
        entryPoints: [cssEntry],
        bundle: true,
        outfile: resolve(distPath, 'index.css'),
        minify: true,
        loader: { '.css': 'css' },
      });

      console.log('✅ CSS bundle built');
    }

    console.log(`\n✅ Build complete: ${packagePath}/dist/`);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
};

buildBlock();
