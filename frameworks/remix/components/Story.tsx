import type { JSX } from 'react';
import { Link } from '@remix-run/react';
import type { IStory } from './types';

function Story({ story }: { story: IStory }): JSX.Element {
  return (
    <li className="news-item">
      <span className="score">{story.points}</span>
      <span className="title">
        {(
          story.url
            ? (
              <>
                <a href={story.url} target="_blank" rel="noreferrer">
                  {story.title}
                </a>
                <span className="host">
                  {' '}
                  (
                  {story.domain}
                  )
                </span>
              </>
            )
            : <Link to={`/item/${story.id}`}>{story.title}</Link>
        )}
      </span>
      <br />
      <span className="meta">
        {(
          story.type !== 'job'
            ? (
              <>
                by
                {' '}
                <Link to={`/users/${story.user}`}>{story.user}</Link>
                {' '}
                {story.time_ago}
                {' '}
                |
                {' '}
                <Link to={`/stories/${story.id}`}>
                  {story.comments_count
                    ? `${story.comments_count} comments`
                    : 'discuss'}
                </Link>
              </>
            )
            : <Link to={`/stories/${story.id}`}>{story.time_ago}</Link>
        )}
      </span>
      {story.type !== 'link' && (
      <>
        {' '}
        <span className="label">{story.type}</span>
      </>
      )}
    </li>
  );
}

export default Story;
