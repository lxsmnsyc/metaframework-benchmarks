const isServer = typeof window === 'undefined';

const story = (path: string): string => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string): string => `https://hacker-news.firebaseio.com/v0/${path}.json`;

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
