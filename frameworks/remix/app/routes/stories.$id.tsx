import { json, type TypedResponse } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { JSX } from 'react';
import type { IStory } from '../../components/types';
import fetchAPI from '../../lib/api';
import Comment from '../../components/Comment';

interface Params {
  params: { id: string };
}

export const loader = async ({ params }: Params): Promise<TypedResponse<IStory>> => (
  json(await fetchAPI<IStory>(`item/${params.id}`))
);

export default function Story(): JSX.Element {
  const story = useLoaderData<typeof loader>();
  return (
    <div className="item-view">
      <div className="item-view-header">
        <a href={story.url} target="_blank" rel="noreferrer">
          <h1>{story.title}</h1>
        </a>
        {!!story.domain && (
          <span className="host">
            (
            {story.domain}
            )
          </span>
        )}
        <p className="meta">
          {story.points}
          {' '}
          points | by
          {' '}
          <Link to={`/users/${story.user}`}>{story.user}</Link>
          {' '}
          {story.time_ago}
          {' '}
          ago
        </p>
      </div>
      <div className="item-view-comments">
        <p className="item-view-comments-header">
          {story.comments_count
            ? `${story.comments_count} comments`
            : 'No comments yet.'}
        </p>
        <ul className="comment-children">
          {story.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      </div>
    </div>
  );
}
