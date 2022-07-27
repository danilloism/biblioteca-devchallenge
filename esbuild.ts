// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { build } from 'esbuild';
import glob from 'tiny-glob';

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
    tsconfig: './tsconfig.json',
  });
})();
