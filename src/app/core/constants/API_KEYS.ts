import { environment } from '../../../environments/environment';

export const API_KEYS = {
  auth: {
    signUp: `${environment.base_Url}/auth/v1/signup`,
    signIn: `${environment.base_Url}/auth/v1/token?grant_type=password`,
  },
};
