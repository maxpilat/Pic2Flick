import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { API } from '../constants/api.constant';
import { Observable } from 'rxjs';
import { Token } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private url = `${environment.unsplashUrl}${API.tokenUrl}`;

  getToken(code: string) {
    const body = {
      client_id: environment.accessKey,
      client_secret: environment.secretKey,
      redirect_uri: window.location.origin,
      code: code,
      grant_type: 'authorization_code',
    };

    return this.http.post<Token>(this.url, body);
  }
}
