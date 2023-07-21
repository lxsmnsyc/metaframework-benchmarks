import type { JSX } from 'react';
import type { TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import fetchAPI from '../../lib/api';

interface IUser {
  error: string;
  id: string;
  created: string;
  karma: number;
  about: string;
}

interface Params {
  params: { id: string };
}

export const loader = async ({ params }: Params): Promise<TypedResponse<IUser>> => (
  json(await fetchAPI<IUser>(`user/${params.id}`))
);

export default function User(): JSX.Element {
  const user = useLoaderData<typeof loader>();
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
