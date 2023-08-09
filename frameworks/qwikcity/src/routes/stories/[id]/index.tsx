import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import fetchAPI, { getSpecialData } from '../../../lib/api';
import type { IStory } from '../../../components/types';
import Comment from '../../../components/Comment';

export const useData = routeLoader$(async (event) => (
  event.params.id === 'special'
    ? await getSpecialData()
    : await fetchAPI<IStory>(`item/${event.params.id}`)
));

export default component$(() => {
  const story = useData();
  return (
    <div class="item-view">
      <div class="item-view-header">
        <a href={story.value.url} target="_blank" rel="noreferrer">
          <h1>{story.value.title}</h1>
        </a>
        {!!story.value.domain && (
          <span class="host">
            (
            {story.value.domain}
            )
          </span>
        )}
        <p class="meta">
          {story.value.points}
          {' '}
          points | by
          {' '}
          <Link href={`/users/${story.value.user}`}>{story.value.user}</Link>
          {' '}
          {story.value.time_ago}
          {' '}
          ago
        </p>
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {story.value.comments_count
            ? `${story.value.comments_count} comments`
            : 'No comments yet.'}
        </p>
        <ul class="comment-children">
          {story.value.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      </div>
    </div>
  );
});
