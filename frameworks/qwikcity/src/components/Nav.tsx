import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { JSX } from '@builder.io/qwik/jsx-runtime';

const Nav = component$((): JSX.Element => (
  <header class="header">
    <nav class="inner">
      <Link href="/">
        <strong>HN</strong>
      </Link>
      <Link href="/new">
        <strong>New</strong>
      </Link>
      <Link href="/show">
        <strong>Show</strong>
      </Link>
      <Link href="/ask">
        <strong>Ask</strong>
      </Link>
      <Link href="/job">
        <strong>Jobs</strong>
      </Link>
    </nav>
  </header>
));

export default Nav;
