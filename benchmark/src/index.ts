import { $ } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';
import killPort from './kill-port';
import { PAGE, PORT } from './constants';
import runWebVitals from './web-vitals';

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
  try {
    await parent$`lighthouse ${PAGE} --output html --output-path="./results/${name}.html" --chrome-flags="--headless"`;
    await runWebVitals(name);
  } finally {
    // This doesn't seem to do anything
    server.kill('SIGKILL');
    // Forcefully kill
    await killPort(PORT);
    await sleep(2000);
  }
}

const FRAMEWORKS = [
  'next-app',
  'remix',
  'solid-start',
  'qwikcity',
  'astro-solid',
];

for (const framework of FRAMEWORKS) {
  // eslint-disable-next-line no-await-in-loop
  await runBenchmark(framework);
}
