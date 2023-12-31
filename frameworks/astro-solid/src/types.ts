export interface IComment {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: IComment[];
}

export interface IStory {
  id: number;
  points: number;
  url: string;
  title: string;
  domain: string;
  type: string;
  time_ago: string;
  user: string;
  comments_count: number;
  comments: IComment[];
}
