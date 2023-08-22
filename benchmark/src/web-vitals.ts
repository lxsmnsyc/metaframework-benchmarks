import * as puppeteer from 'puppeteer';
import path from 'path';
import { PAGE } from './constants';
import { outputJson } from './fs-utils';

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
