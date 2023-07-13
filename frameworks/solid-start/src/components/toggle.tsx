import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';

export default function Toggle(props: { children: JSX.Element }): JSX.Element {
  const [open, setOpen] = createSignal(true);

  return (
    <>
      <div class="toggle" classList={{ open: open() }}>
        <button
          type="button"
          onClick={(): void => {
            setOpen((o) => !o);
          }}
        >
          {open() ? '[-]' : '[+] comments collapsed'}
        </button>
      </div>
      <ul
        class="comment-children"
        style={{ display: open() ? 'block' : 'none' }}
      >
        {props.children}
      </ul>
    </>
  );
}
