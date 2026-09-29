import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

import { API_KEYS } from '../../../core/constants/API_KEYS';
import { RegisterPayload, UserData } from '../interface/Register';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
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
}
