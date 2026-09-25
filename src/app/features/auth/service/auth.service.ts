import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  signup(data: {}, options?: { headers?: HttpHeaders }) {
    return this.httpClient.post(`${environment.base_Url}/auth/v1/signup`, data, options);
  }
  uploadImage(image: File) {
    const fileName = `${Date.now()}_${image.name}`;

    const formData = new FormData();
    formData.append('file', image);

    return this.httpClient
      .post(`${environment.base_Url}/storage/v1/object/uploads/users/${fileName}`, formData, {})
      .pipe(
        map(() => {
          // عدّلي الرابط ده حسب شكل الـ response الراجع من Supabase عندك
          return `${environment.base_Url}/storage/v1/object/public/uploads/users/${fileName}`;
        }),
      );
  }
}
