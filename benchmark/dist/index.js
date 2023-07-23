// src/index.ts
import { $, cd } from "zx/core";
import path from "path";
import { fileURLToPath } from "url";
import { sleep } from "zx";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
async function runBenchmark(name) {
  await $`cd ../frameworks/${name} && npm run build`;
  const server = $`cd ../frameworks/${name} && npm run start`;
  await sleep(5e3);
  await $`lighthouse http://localhost:3000 --output html --output-path="./results/${name}.html" --quiet --chrome-flags="--headless"`;
  await server.kill();
}
var FRAMEWORKS = [
  "next-app"
];
cd(path.join(__dirname, ".."));
for (const framework of FRAMEWORKS) {
  await runBenchmark(framework);
}
