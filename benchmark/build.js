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
    'zx',
    'lighthouse'
  ],
  target: "esnext",
  legalComments: 'eof',
});