'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

export default function Toggle({ children }: { children: ReactNode }): JSX.Element {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className={`toggle ${open ? 'open' : ''}`}>
        <button
          type="button"
          onClick={(): void => {
            setOpen((o) => !o);
          }}
        >
          {open ? '[-]' : '[+] comments collapsed'}
        </button>
      </div>
      <ul
        className="comment-children"
        style={{ display: open ? 'block' : 'none' }}
      >
        {children}
      </ul>
    </>
  );
}
