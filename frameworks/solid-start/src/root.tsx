// @refresh reload
import type { JSX } from 'solid-js';
import { Suspense, createEffect } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import Nav from './components/nav';
import './root.css';
import measure from './lib/measure';

export default function Root(): JSX.Element {
  createEffect(() => {
    measure();
  });
  return (
    <Html lang="en">
      <Head>
        <Title>Hacker News Clone</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="Hacker News Clone" />
      </Head>
      <Body>
        <Nav />
        <ErrorBoundary>
          <Suspense fallback={<div class="news-list-nav">Loading...</div>}>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
