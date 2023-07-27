import type { JSX, Resource } from 'solid-js';
import { createResource, For, Show } from 'solid-js';
import type { RouteDataArgs } from 'solid-start';
import { A, useRouteData } from 'solid-start';
import Comment from '../../components/comment';
import fetchAPI, { getSpecialData } from '../../lib/api';
import type { IStory } from '../../types';

export const routeData = (props: RouteDataArgs): Resource<IStory> => {
  const [story] = createResource<IStory, string>(
    () => `item/${props.params.id}`,
    async (id) => {
      if (id === 'item/special') {
        return getSpecialData();
      }
      return fetchAPI<IStory>(id);
    },
  );
  return story;
};

function Story(): JSX.Element {
  const story = useRouteData<typeof routeData>();
  return (
    <Show when={story()}>
      <div class="item-view">
        <div class="item-view-header">
          <a href={story()!.url} target="_blank" rel="noreferrer">
            <h1>{story()!.title}</h1>
          </a>
          <Show when={story()!.domain}>
            <span class="host">
              (
              {story()!.domain}
              )
            </span>
          </Show>
          <p class="meta">
            {story()!.points}
            {' '}
            points | by
            {' '}
            <A href={`/users/${story()!.user}`}>{story()!.user}</A>
            {' '}
            {story()!.time_ago}
            {' '}
            ago
          </p>
        </div>
        <div class="item-view-comments">
          <p class="item-view-comments-header">
            {story()!.comments_count
              ? `${story()!.comments_count} comments`
              : 'No comments yet.'}
          </p>
          <ul class="comment-children">
            <For each={story()!.comments}>
              {(comment): JSX.Element => <Comment comment={comment} />}
            </For>
          </ul>
        </div>
      </div>
    </Show>
  );
}

export default Story;
