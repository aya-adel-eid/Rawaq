export interface IAllComments {
  id: string;
  post_id: string;
  content: string;
  created_at: string;
  author_id: string;
  author: Author;
}

export interface Author {
  id: string;
  last_name: string;
  avatar_url: string;
  first_name: string;
}
