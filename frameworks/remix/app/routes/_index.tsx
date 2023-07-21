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

interface Params {
  request: Request;
  params: {
    type: string;
  };
}

interface Result {
  stories: IStory[];
  page: number;
}

export const loader = async ({ params, request }: Params): Promise<TypedResponse<Result>> => {
  const url = new URL(request.url);
  const page = +(url.searchParams.get('page') || 1);
  return json({
    page,
    stories: await fetchAPI<IStory[]>(`${mapStories.top}?page=${page}`),
  });
};

export default function Stories(): JSX.Element {
  const { stories, page } = useLoaderData<typeof loader>();
  return (
    <div className="news-view">
      <div className="news-list-nav">
        {(
          page > 1
            ? (
              <Link
                className="page-link"
                to={`/top?page=${page - 1}`}
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
                to={`/top?page=${page + 1}`}
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
