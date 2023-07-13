import type { JSX, Resource } from 'solid-js';
import { createResource, For, Show } from 'solid-js';
import type { RouteDataArgs } from 'solid-start';
import { A, useRouteData } from 'solid-start';
import Story from '../components/story';
import fetchAPI from '../lib/api';
import type { IStory } from '~/types';

const mapStories = {
  top: 'news',
  new: 'newest',
  show: 'show',
  ask: 'ask',
  job: 'jobs',
} as const;

type MapStories = keyof typeof mapStories;

interface Data {
  type: () => MapStories;
  page: () => number;
  stories: Resource<IStory[]>;
}

export const routeData = ({ location, params }: RouteDataArgs): Data => {
  const page = (): number => +location.query.page || 1;
  const type = (): MapStories => (params.stories || 'top') as MapStories;

  const [stories] = createResource<IStory[], string>(
    () => `${mapStories[type()]}?page=${page()}`,
    fetchAPI<IStory[]>,
  );

  return { type, stories, page };
};

function Stories(): JSX.Element {
  const { page, type, stories } = useRouteData<typeof routeData>();
  return (
    <div class="news-view">
      <div class="news-list-nav">
        <Show
          when={page() > 1}
          fallback={(
            <span class="page-link disabled" aria-disabled="true">
              {'<'}
              {' '}
              prev
            </span>
          )}
        >
          <A
            class="page-link"
            href={`/${type()}?page=${page() - 1}`}
            aria-label="Previous Page"
          >
            {'<'}
            {' '}
            prev
          </A>
        </Show>
        <span>
          page
          {' '}
          {page()}
        </span>
        <Show
          when={stories() && stories()!.length >= 29}
          fallback={(
            <span class="page-link disabled" aria-disabled="true">
              more
              {' '}
              {'>'}
            </span>
          )}
        >
          <A
            class="page-link"
            href={`/${type()}?page=${page() + 1}`}
            aria-label="Next Page"
          >
            more
            {' '}
            {'>'}
          </A>
        </Show>
      </div>
      <main class="news-list">
        <Show when={stories()}>
          <ul>
            <For each={stories()}>{(story): JSX.Element => <Story story={story} />}</For>
          </ul>
        </Show>
      </main>
    </div>
  );
}

export default Stories;
