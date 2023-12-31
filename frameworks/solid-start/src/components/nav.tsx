import type { JSX } from 'solid-js';
import { A } from 'solid-start';

export default function Nav(): JSX.Element {
  return (
    <header class="header">
      <nav class="inner">
        <A href="/">
          <strong>HN</strong>
        </A>
        <A href="/new">
          <strong>New</strong>
        </A>
        <A href="/show">
          <strong>Show</strong>
        </A>
        <A href="/ask">
          <strong>Ask</strong>
        </A>
        <A href="/job">
          <strong>Jobs</strong>
        </A>
      </nav>
    </header>
  );
}
