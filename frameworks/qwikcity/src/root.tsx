import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
} from '@builder.io/qwik-city';

import './root.css';
import Nav from './components/Nav';

export default component$(() => (
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  <QwikCityProvider>
    <head>
      <title>Hacker News Clone</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Hacker News Clone" />
    </head>
    <body lang="en">
      <Nav />
      <RouterOutlet />
    </body>
  </QwikCityProvider>
));
