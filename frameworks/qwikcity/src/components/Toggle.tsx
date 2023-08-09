import { Slot, component$, useSignal } from '@builder.io/qwik';

const Toggle = component$(() => {
  const open = useSignal(true);

  return (
    <>
      <div class={`toggle ${open.value ? 'open' : ''}`}>
        <button
          type="button"
          onClick$={(): void => {
            open.value = !open.value;
          }}
        >
          {open.value ? '[-]' : '[+] comments collapsed'}
        </button>
      </div>
      <ul
        class="comment-children"
        style={{ display: open.value ? 'block' : 'none' }}
      >
        <Slot />
      </ul>
    </>
  );
});

export default Toggle;
