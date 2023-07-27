import data from './data';
import type { IStory } from '../components/types';

const isServer = typeof window === 'undefined';

const story = (path: string): string => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string): string => `https://hacker-news.firebaseio.com/v0/${path}.json`;

const sleep = async (ms: number): Promise<boolean> => new Promise((resolve) => {
  setTimeout(resolve, ms, true);
});

export async function getSpecialData(): Promise<IStory> {
  await sleep(500);
  return data;
}

export default async function fetchAPI<T>(path: string): Promise<T> {
  const url = path.startsWith('user') ? user(path) : story(path);
  const headers: Record<string, string> = isServer
    ? { 'User-Agent': 'chrome' }
    : {};

  const response = await fetch(url, { headers });
  const text = await response.text();
  try {
    if (text === null) {
      throw new Error('not found');
    }
    return JSON.parse(text) as T;
  } catch (e) {
    console.error(`Recevied from API: ${text}`);
    console.error(e);
    throw e;
  }
}
