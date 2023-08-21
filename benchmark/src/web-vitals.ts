import puppeteer from 'puppeteer';
import path from 'path';
import { PAGE } from './constants';
import { outputJson } from './fs-utils';

export default async function runWebVitals(framework: string): Promise<void> {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  // TODO setup mobile emulation
  await page.setViewport({
    width: 1366,
    height: 768,
  });
  await page.goto(PAGE);
  page.on('console', (msg): void => {
    Promise.all(msg.args().map(async (arg) => arg.jsonValue())).then(console.log, console.error);
  });
  const body = await page.waitForSelector('body');
  if (body) {
    await body.click();
  }
  const dummyPage = await browser.newPage();
  await dummyPage.bringToFront();
  await page.bringToFront();
  if (body) {
    await body.click();
  }
  const el = await page.waitForSelector('#web-vitals', {
    timeout: 5000,
  });

  if (el) {
    const filePath = path.join(process.cwd(), 'web-vitals', `${framework}.json`);
    await outputJson(filePath, await page.evaluate((target) => target.textContent, el));
  }
  await browser.close();
}
