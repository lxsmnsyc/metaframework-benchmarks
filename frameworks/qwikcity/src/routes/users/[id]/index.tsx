import { component$ } from '@builder.io/qwik';
import fetchAPI from '../../../lib/api';
import { routeLoader$ } from '@builder.io/qwik-city';

interface IUser {
  error: string;
  id: string;
  created: string;
  karma: number;
  about: string;
}

export const useData = routeLoader$(async (event) => (
  fetchAPI<IUser>(`user/${event.params.id}`)
));

export default component$(() => {
  const user = useData();
  return (
    
    <div class="user-view">
      {
        user.value.error
          ? <h1>User not found.</h1>
          : (
            <>
              <h1>
                User :
                {' '}
                {user.value.id}
              </h1>
              <ul class="meta">
                <li>
                  <span class="label">Created:</span>
                  {' '}
                  {user.value.created}
                </li>
                <li>
                  <span class="label">Karma:</span>
                  {' '}
                  {user.value.karma}
                </li>
                {!!user.value.about && (
                <>
                  <li dangerouslySetInnerHTML={user.value.about} class="about" />
                  {' '}
                </>
                )}
              </ul>
              <p class="links">
                <a href={`https://news.ycombinator.com/submitted?id=${user.value.id}`}>
                  submissions
                </a>
                {' '}
                |
                {' '}
                <a href={`https://news.ycombinator.com/threads?id=${user.value.id}`}>
                  comments
                </a>
              </p>
            </>
          )
      }
    </div>
  );
});
