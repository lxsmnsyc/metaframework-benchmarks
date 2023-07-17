import Link from 'next/link';
import type { JSX } from 'react';

export default function Nav(): JSX.Element {
  return (
    <header className="header">
      <nav className="inner">
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
  );
}
