import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { IComment } from './types';
import Toggle from './Toggle';

interface CommentProps {
  comment: IComment;
}

const Comment = component$(({ comment }: CommentProps) => (
  <li class="comment">
    <div class="by">
      <Link href={`/users/${comment.user}`}>{comment.user}</Link>
      {' '}
      {comment.time_ago}
      {' '}
      ago
    </div>
    <div
      class="text"
      dangerouslySetInnerHTML={comment.content}
    />
    {!!comment.comments.length && (
      <Toggle>
        {comment.comments.map((cmt) => <Comment key={cmt.id} comment={cmt} />)}
      </Toggle>
    )}
  </li>
));

export default Comment;
