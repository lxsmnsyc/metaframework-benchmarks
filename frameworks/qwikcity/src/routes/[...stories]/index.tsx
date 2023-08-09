import { Link, routeLoader$ } from '@builder.io/qwik-city';
import type { JSX } from '@builder.io/qwik/jsx-runtime';
import { component$ } from '@builder.io/qwik';
import fetchAPI from '../../lib/api';
import type { IStory } from '../../components/types';
import Story from '../../components/Story';

const mapStories = {
  top: 'news',
  new: 'newest',
  show: 'show',
  ask: 'ask',
  job: 'jobs',
} as const;

type MapStories = keyof typeof mapStories;

export const useData = routeLoader$(async (event) => {
  const currentPage = event.query.get('page');
  const page = currentPage ? +currentPage : 1;
  const type = (event.params.stories ? event.params.stories[0] : 'top') as MapStories;
  const stories = await fetchAPI<IStory[]>(`${mapStories[type]}?page=${page}`);
  return {
    stories,
    page,
    type,
  };
});

export default component$(() => {
  const data = useData();
  return (
    <div class="news-view">
      <div class="news-list-nav">
        {(
          data.value.page > 1
            ? (
              <Link
                class="page-link"
                href={`/${data.value.type}?page=${data.value.page - 1}`}
                aria-label="Previous Page"
              >
                {'<'}
                {' '}
                prev
              </Link>
            )
            : (
              <span class="page-link disabled" aria-disabled="true">
                {'<'}
                {' '}
                prev
              </span>
            )
        )}
        <span>
          page
          {' '}
          {data.value.page}
        </span>
        {(
          data.value.stories.length >= 29
            ? (
              <Link
                class="page-link"
                href={`/${data.value.type}?page=${data.value.page + 1}`}
                aria-label="Next Page"
              >
                more
                {' '}
                {'>'}
              </Link>
            )
            : (
              <span class="page-link disabled" aria-disabled="true">
                more
                {' '}
                {'>'}
              </span>
            )
        )}
      </div>
      <main class="news-list">
        <ul>
          {data.value.stories.map((story): JSX.Element => <Story key={story.id} story={story} />)}
        </ul>
      </main>
    </div>
  );
});
