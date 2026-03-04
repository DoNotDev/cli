/**
 * PostCSS config for Next.js
 * Uses custom resolver for workspace package resolution (matches framework pattern)
 */

import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';
import { createRequire } from 'node:module';
import { resolve, join, dirname } from 'node:path';
import { existsSync } from 'node:fs';

const findPackageRoot = (startDir) => {
  let current = resolve(startDir);
  const root = resolve('/');
  
  while (current !== root) {
    const pkgPath = join(current, 'package.json');
    if (existsSync(pkgPath)) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  
  return startDir;
};

const customResolve = (id, basedir) => {
  try {
    const packageRoot = findPackageRoot(basedir);
    const require = createRequire(join(packageRoot, 'package.json'));
    return require.resolve(id);
  } catch (error) {
    return resolve(basedir, id);
  }
};

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    postcssImport({ resolve: customResolve }),
    postcssNesting,
    autoprefixer({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'not dead',
        'not op_mini all',
      ],
      grid: 'autoplace',
    }),
  ],
};

export default config;
