import { environment } from '../../../environments/environment';

export const API_KEYS = {
  auth: {
    signUp: `${environment.base_Url}/auth/v1/signup`,
    signIn: `${environment.base_Url}/auth/v1/token?grant_type=password`,
    forgotPassword: `${environment.base_Url}/auth/v1/recover`,
    resetPass: `${environment.base_Url}/auth/v1/user`,
    refreshToken: `${environment.base_Url}/auth/v1/token?grant_type=refresh_token`,
    logOut: `${environment.base_Url}/auth/v1/logout`,
  },
  dashboard: {
    newGroup: `${environment.base_Url}/rest/v1/groups`,
    allGroupsStudent: `${environment.base_Url}/rest/v1/groups_with_status`,
    GroupJoinRequests: `${environment.base_Url}/rest/v1/group_join_requests`,
    allGroupJoinReq: `${environment.base_Url}/rest/v1/get_group_join_requests`,
    acceptJoinReq: `${environment.base_Url}/rest/v1/rpc/accept_join_request`,
  },
};
