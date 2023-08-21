import { build } from 'esbuild';

await build({
  entryPoints: [
    './src/index.ts',
  ],
  outfile: './dist/index.js',
  bundle: true,
  sourcemap: false,
  format: 'esm',
  platform: 'node',
  tsconfig: './tsconfig.json',
  external: [
    'execa',
    'lighthouse',
    'puppeteer'
  ],
  target: "esnext",
  legalComments: 'eof',
});