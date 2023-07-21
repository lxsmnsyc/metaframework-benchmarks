import type { JSX } from 'solid-js';
import { For, Show } from 'solid-js';
import { A } from 'solid-start';
import type { IComment } from '../types';
import Toggle from './toggle';

function Comment(props: { comment: IComment }): JSX.Element {
  return (
    <li class="comment">
      <div class="by">
        <A href={`/users/${props.comment.user}`}>{props.comment.user}</A>
        {' '}
        {props.comment.time_ago}
        {' '}
        ago
      </div>
      <div class="text" innerHTML={props.comment.content} />
      <Show when={props.comment.comments.length}>
        <Toggle>
          <For each={props.comment.comments}>
            {(comment): JSX.Element => <Comment comment={comment} />}
          </For>
        </Toggle>
      </Show>
    </li>
  );
}

export default Comment;
