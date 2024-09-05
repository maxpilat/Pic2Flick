import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { API } from '../constants/api.constant';
import { BehaviorSubject, tap } from 'rxjs';
import { Token } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private tokenUrl = `${environment.unsplashUrl}${API.tokenUrl}`;
  private key = 'token';

  private authSubject = new BehaviorSubject(this.getToken());
  token$ = this.authSubject.asObservable();

  private saveToken(token: Token) {
    localStorage.setItem(this.key, JSON.stringify(token));
  }

  private clearToken() {
    localStorage.removeItem(this.key);
  }

  getToken(): Token | null {
    const tokenStr = localStorage.getItem(this.key);

    return tokenStr ? (JSON.parse(tokenStr) as Token) : null;
  }

  isAuthorized() {
    return this.getToken() !== null;
  }

  authorize(code: string) {
    const body = {
      client_id: environment.accessKey,
      client_secret: environment.secretKey,
      redirect_uri: window.location.origin,
      code: code,
      grant_type: 'authorization_code',
    };

    return this.http.post<Token>(this.tokenUrl, body).pipe(
      tap((token) => {
        this.saveToken(token);
        this.authSubject.next(token);
      })
    );
  }

  unauthorize() {
    this.clearToken();
    this.authSubject.next(null);
  }

  getAuthUrl(redirectUrl: string) {
    return `${environment.unsplashUrl}${API.authUrl}?client_id=${environment.accessKey}&redirect_uri=${redirectUrl}&response_type=code`;
  }
}
