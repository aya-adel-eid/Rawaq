import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

import { API_KEYS } from '../../../core/constants/API_KEYS';
import { RegisterPayload, UserData } from '../interface/Register';
import { ISignIn } from '../interface/ISignIn';
import { STORED_KEY } from '../../../core/constants/STORED_KEYS';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly rememberMeDays = 30;
  signup(data: RegisterPayload) {
    return this.httpClient.post<UserData>(API_KEYS.auth.signUp, data);
  }
  uploadImage(image: File) {
    // make uniqe name image
    const fileName = `${Date.now()}_${image.name}`;

    const formData = new FormData();
    formData.append('file', image);

    return this.httpClient.post(
      `${environment.base_Url}/storage/v1/object/uploads/users/${fileName}`,
      formData,
    );
  }
  // login
  signIn(data: { password: string; email: string }) {
    return this.httpClient.post<ISignIn>(API_KEYS.auth.signIn, data);
  }
  // store seasion
  storeSession(
    dataStore: { userToken: string; refresh_token: string; role: string },
    rememberMe: boolean = false,
  ) {
    const storage: Storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(STORED_KEY.refresh_token, dataStore.refresh_token);
    storage.setItem(STORED_KEY.userToken, dataStore.userToken);
    storage.setItem(STORED_KEY.role, dataStore.role);
    if (rememberMe) {
      const expireAt = Date.now() + this.rememberMeDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORED_KEY.rememberMeExpiry, String(expireAt));
    }
  }
  //  Remember me
  isRememberMe() {
    const expiresAt = localStorage.getItem(STORED_KEY.rememberMeExpiry);
    if (!expiresAt) {
      return false;
    }
    return Date.now() > Number(expiresAt);
  }
}
