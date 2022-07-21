import glob from 'tiny-glob';
import { build } from 'esbuild';
(async function () {
  const entryPoints = await glob('src/**/*.ts');

  build({
    entryPoints,
    logLevel: 'info',
    outdir: 'dist',
    bundle: true,
    minify: true,
    platform: 'node',
    format: 'cjs',
    sourcemap: true,
    treeShaking: true,
  });
})();
