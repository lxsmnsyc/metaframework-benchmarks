import type { JSX } from 'react';
import type { TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
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

interface Params {
  request: Request;
  params: {
    type: string;
  };
}

interface Result {
  stories: IStory[];
  type: MapStories;
  page: number;
}

export const loader = async ({ params, request }: Params): Promise<TypedResponse<Result>> => {
  const type = (params.type || 'top') as MapStories;
  const url = new URL(request.url);
  const page = +(url.searchParams.get('page') || 1);
  return json({
    type,
    page,
    stories: await fetchAPI<IStory[]>(`${mapStories[type]}?page=${page}`),
  });
};

export default function Stories(): JSX.Element {
  const { type, stories, page } = useLoaderData<typeof loader>();
  if (!(type in mapStories)) {
    return <h1>Not found</h1>;
  }
  return (
    <div className="news-view">
      <div className="news-list-nav">
        {(
          page > 1
            ? (
              <Link
                className="page-link"
                to={`/${type}?page=${page - 1}`}
                aria-label="Previous Page"
              >
                {'<'}
                {' '}
                prev
              </Link>
            )
            : (
              <span className="page-link disabled" aria-disabled="true">
                {'<'}
                {' '}
                prev
              </span>
            )
        )}
        <span>
          page
          {' '}
          {page}
        </span>
        {(
          stories.length >= 29
            ? (
              <Link
                className="page-link"
                to={`/${type}?page=${page + 1}`}
                aria-label="Next Page"
              >
                more
                {' '}
                {'>'}
              </Link>
            )
            : (
              <span className="page-link disabled" aria-disabled="true">
                more
                {' '}
                {'>'}
              </span>
            )
        )}
      </div>
      <main className="news-list">
        <ul>
          {stories.map((story): JSX.Element => <Story key={story.id} story={story} />)}
        </ul>
      </main>
    </div>
  );
}
