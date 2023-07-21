import { Link } from '@remix-run/react';
import type { JSX } from 'react';

export default function Nav(): JSX.Element {
  return (
    <header className="header">
      <nav className="inner">
        <Link to="/">
          <strong>HN</strong>
        </Link>
        <Link to="/new">
          <strong>New</strong>
        </Link>
        <Link to="/show">
          <strong>Show</strong>
        </Link>
        <Link to="/ask">
          <strong>Ask</strong>
        </Link>
        <Link to="/job">
          <strong>Jobs</strong>
        </Link>
      </nav>
    </header>
  );
}
