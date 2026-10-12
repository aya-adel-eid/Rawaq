export interface ILatestPost {
  id: string;
  group_id: string;
  content: string;
  created_at: string;
  author_id: string;
  author: Author;
  comments_count: number;
  likes_count: number;
  is_liked: boolean;
}

export interface Author {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
}
