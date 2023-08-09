import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { IStory } from './types';

interface StoryProps {
  story: IStory;
}

const Story = component$(({ story }: StoryProps) => (
  <li class="news-item">
    <span class="score">{story.points}</span>
    <span class="title">
      {(
        story.url
          ? (
            <>
              <a href={story.url} target="_blank" rel="noreferrer">
                {story.title}
              </a>
              <span class="host">
                {' '}
                (
                {story.domain}
                )
              </span>
            </>
          )
          : <Link href={`/item/${story.id}`}>{story.title}</Link>
      )}
    </span>
    <br />
    <span class="meta">
      {(
        story.type !== 'job'
          ? (
            <>
              by
              {' '}
              <Link href={`/users/${story.user}`}>{story.user}</Link>
              {' '}
              {story.time_ago}
              {' '}
              |
              {' '}
              <Link href={`/stories/${story.id}`}>
                {story.comments_count
                  ? `${story.comments_count} comments`
                  : 'discuss'}
              </Link>
            </>
          )
          : <Link href={`/stories/${story.id}`}>{story.time_ago}</Link>
      )}
    </span>
    {story.type !== 'link' && (
    <>
      {' '}
      <span class="label">{story.type}</span>
    </>
    )}
  </li>
));

export default Story;
