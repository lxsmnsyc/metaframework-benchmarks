import type { JSX } from 'react';
import type { IComment } from './types';
import Toggle from './Toggle';
import Link from 'next/link';

export default function Comment({ comment }: { comment: IComment }): JSX.Element {
  return (
    <li className="comment">
      <div className="by">
        <Link href={`/users/${comment.user}`}>{comment.user}</Link>
        {' '}
        {comment.time_ago}
        {' '}
        ago
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: comment.content
        }}
      />
      {!!comment.comments.length && (
        <Toggle>
          {comment.comments.map((cmt) => <Comment key={cmt.id} comment={cmt} />)}
        </Toggle>
      )}
    </li>
  );
}

