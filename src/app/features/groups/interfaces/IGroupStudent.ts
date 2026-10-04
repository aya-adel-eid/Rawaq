export interface IGroupStudent {
  id: string;
  name: string;
  created_at: string;
  invite_code?: string;
  max_no_of_students: number;
  category?: string;
  start_date?: string;
  description?: string;
  duration_in_days?: number;
  current_students_count: number;
  created_by: CreatedBy;
  status: string;
}

export interface CreatedBy {
  id: string;
  last_name: string;
  avatar_url?: string;
  first_name: string;
}
