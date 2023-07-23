import { $, cd } from 'zx/core';
import path from 'path';
import { fileURLToPath } from 'url';
import { sleep } from 'zx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runBenchmark(name: string): Promise<void> {
  await $`cd ../frameworks/${name} && npm run build`;
  const server = $`cd ../frameworks/${name} && npm run start`;
  await sleep(5000);
  await $`lighthouse http://localhost:3000 --output html --output-path="./results/${name}.html" --chrome-flags="--headless"`;
  await server.kill();
}

const FRAMEWORKS = [
  'next-app',
  'remix',
  'solid-start',
];

cd(path.join(__dirname, '..'));
for (const framework of FRAMEWORKS) {
  await runBenchmark(framework);
}
