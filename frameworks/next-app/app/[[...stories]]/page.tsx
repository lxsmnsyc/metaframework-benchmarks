import type { JSX } from 'react';
import Link from 'next/link';
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

interface Props {
  params: {
    stories?: string[];
  };
  searchParams: {
    page?: string;
  }
}

async function Stories(props: Props): Promise<JSX.Element> {
  const page = props.searchParams.page ? +props.searchParams.page : 1;
  const type = props.params.stories ? props.params.stories[0] : 'top' as MapStories;
  if (type === 'favicon.ico') {
    return <h1>Not found</h1>;
  }
  const stories = await fetchAPI<IStory[]>(`${mapStories[type]}?page=${page}`);
  return (
    <div className="news-view">
      <div className="news-list-nav">
        {(
          page > 1
            ? (
              <Link
                className="page-link"
                href={`/${type}?page=${page - 1}`}
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
                href={`/${type}?page=${page + 1}`}
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

export default Stories;
