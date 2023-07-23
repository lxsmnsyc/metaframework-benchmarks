import { $ } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const sleep = async (ms: number): Promise<boolean> => new Promise<boolean>((res) => {
  setTimeout(res, ms, true);
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parent$ = $({
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
});

async function runBenchmark(name: string): Promise<void> {
  const framework$ = $({
    cwd: path.join(__dirname, `../../frameworks/${name}`),
    stdio: 'inherit',
  });
  await framework$`npm run build`;
  const server = framework$`npm run start`;
  // give time for the server to start
  await sleep(5000);
  await parent$`lighthouse http://localhost:3000 --output html --output-path="./results/${name}.html" --chrome-flags="--headless"`;
  // This doesn't seem to do anything
  server.kill('SIGKILL');
  await sleep(5000);
}

const FRAMEWORKS = [
  'next-app',
  'remix',
  'solid-start',
];

for (const framework of FRAMEWORKS) {
  // eslint-disable-next-line no-await-in-loop
  await runBenchmark(framework);
}
