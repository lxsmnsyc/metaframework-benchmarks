import * as puppeteer from 'puppeteer';
import path from 'path';
import type {
  CLSMetric, FCPMetric, FIDMetric, INPMetric, LCPMetric, TTFBMetric,
} from 'web-vitals';
import { PAGE } from './constants';
import { outputFile, outputJson, readJson } from './fs-utils';

export default async function runWebVitals(framework: string): Promise<void> {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.emulate(puppeteer.KnownDevices['iPhone 13']);
  await page.goto(PAGE);
  // Just to check if all measurements are captured.
  page.on('console', (msg): void => {
    Promise.all(msg.args().map(async (arg) => arg.jsonValue())).then(console.log, console.error);
  });
  // When page loads, click the page
  const body = await page.waitForSelector('body');
  if (body) {
    await body.click();
  }
  // Toggle page visibility by switching pages
  const dummyPage = await browser.newPage();
  await dummyPage.bringToFront();
  await page.bringToFront();
  // Focus again
  if (body) {
    await body.click();
  }
  const el = await page.waitForSelector('#web-vitals', {
    timeout: 5000,
  });

  if (el) {
    const filePath = path.join(process.cwd(), 'web-vitals', `${framework}.json`);
    const result = await page.evaluate((target) => target.textContent, el);
    if (result) {
      await outputJson(filePath, JSON.parse(result));
    }
  }
  await browser.close();
}

type WebVitalsMetric =
  | CLSMetric
  | FCPMetric
  | FIDMetric
  | INPMetric
  | LCPMetric
  | TTFBMetric;

const SEQUENCE = ['FCP', 'TTFB', 'LCP', 'FID', 'INP', 'CLS'];

async function convertWebVitalsToTable(framework: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'web-vitals', `${framework}.json`);
  const data = await readJson<WebVitalsMetric[]>(filePath);
  // Simplify data
  const simplifed = data.map((item) => [item.name, {
    rating: item.rating,
    value: item.value,
  }] as const);
  const mapped = Object.fromEntries(simplifed);

  let result = `<td>${framework}</td>`;
  for (const key of SEQUENCE) {
    result += `<td>${mapped[key].value.toFixed(2)} (${mapped[key].rating})</td>`;
  }
  return `<tr>${result}</tr>`;
}

const HEADER = `<thead><tr><th>Framework</th>${SEQUENCE.map((item) => `<th>${item}</th>`).join('')}</tr></thead>`;

export async function printWebVitalsTable(frameworks: string[]): Promise<void> {
  const results = `<table>${HEADER}<tbody>${(await Promise.all(frameworks.map(convertWebVitalsToTable))).join('')}</tbody></table>`;
  await outputFile(
    path.join(process.cwd(), 'web-vitals', 'results.html'),
    `<!DOCTYPE html><html><head>WebVitals Result</head><body>${results}</body></html>`,
    { encoding: 'utf-8' },
  );
}
