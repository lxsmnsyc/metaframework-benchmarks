'use client';

import { useEffect } from 'react';
import Nav from '../components/Nav';
import '../lib/root.css';
import measure from '../lib/measure';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  useEffect(() => {
    measure();
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Hacker News Clone</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Hacker News Clone" />
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
