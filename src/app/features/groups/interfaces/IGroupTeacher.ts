export interface IGroupTeacher {
  id: string;
  name: string;
  created_by: string;
  invite_code: string;
  created_at: string;
  description: string;
  no_of_students: number;
  category: string;
  start_date: string;
  duration_in_days: number;
  is_archived: boolean;
  members_count: number;
  assignments_count: number;
  posts_count: number;
}
