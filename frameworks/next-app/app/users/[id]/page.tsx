import type { JSX } from 'react';
import fetchAPI from '../../../lib/api';

interface IUser {
  error: string;
  id: string;
  created: string;
  karma: number;
  about: string;
}

async function User({ params }: { params: { id: string } }): Promise<JSX.Element> {
  const user = await fetchAPI<IUser>(`user/${params.id}`);
  return (
    <div className="user-view">
      {
        user.error
          ? <h1>User not found.</h1>
          : (
            <>
              <h1>
                User :
                {' '}
                {user.id}
              </h1>
              <ul className="meta">
                <li>
                  <span className="label">Created:</span>
                  {' '}
                  {user.created}
                </li>
                <li>
                  <span className="label">Karma:</span>
                  {' '}
                  {user.karma}
                </li>
                {!!user.about && (
                <>
                  <li dangerouslySetInnerHTML={{ __html: user.about }} className="about" />
                  {' '}
                </>
                )}
              </ul>
              <p className="links">
                <a href={`https://news.ycombinator.com/submitted?id=${user.id}`}>
                  submissions
                </a>
                {' '}
                |
                {' '}
                <a href={`https://news.ycombinator.com/threads?id=${user.id}`}>
                  comments
                </a>
              </p>
            </>
          )
      }
    </div>
  );
}

export default User;
