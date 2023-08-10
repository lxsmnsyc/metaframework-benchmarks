import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';

interface ToggleProps {
  parent: boolean;
  children: JSX.Element;
}

export default function Toggle(props: ToggleProps): JSX.Element {
  const [open, setOpen] = createSignal(props.parent);

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
