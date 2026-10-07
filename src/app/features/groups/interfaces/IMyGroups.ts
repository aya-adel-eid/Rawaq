export interface ImyGroups {
  id: string;
  name: string;
  created_at: string;
  category: string;
  start_date: string;
  duration_in_days: number;
  teacher: Teacher;
  description: string;
}

export interface Teacher {
  id: string;
  last_name: string;
  avatar_url: string | null;
  first_name: string;
}
