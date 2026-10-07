export interface IAllGroupJoinReq {
  id: string;
  group_id: string;
  status: string;
  created_at: string;
  group_name: string;
  email: string;
  first_name: string;
  last_name: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  last_name: string;
  avatar_url: string;
  first_name: string;
}
