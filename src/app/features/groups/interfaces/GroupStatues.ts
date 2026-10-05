export type GroupStatus = 'not_member' | 'pending' | 'member';

export interface IGroupStudent {
  // ...باقي الحقول
  status: GroupStatus;
}
