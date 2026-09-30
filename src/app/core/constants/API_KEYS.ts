import { environment } from '../../../environments/environment';

export const API_KEYS = {
  auth: {
    signUp: `${environment.base_Url}/auth/v1/signup`,
    signIn: `${environment.base_Url}/auth/v1/token?grant_type=password`,
    forgotPassword: `${environment.base_Url}/auth/v1/recover`,
    resetPass: `${environment.base_Url}/auth/v1/user`,
    refreshToken: `${environment.base_Url}/auth/v1/token?grant_type=refresh_token`,
  },
};
