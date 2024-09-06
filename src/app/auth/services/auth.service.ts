import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { API } from '../constants/api.constant';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private readonly authenticationUrl = `${environment.unsplashUrl}${API.authPath}?client_id=${environment.accessKey}&redirect_uri=${environment.authUrl}&response_type=code`;
  private readonly authorizationUrl = `${environment.unsplashUrl}${API.tokenPath}`;
  private readonly tokenKey = 'token';
  private readonly redirectUrlKey = 'redirectUrl';
  private authSubject = new BehaviorSubject(this.getToken());
  token$ = this.authSubject.asObservable();

  private saveToken(token: Token) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  private clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  setRedirectUrl(redirectUrl: string | null) {
    if (redirectUrl) {
      localStorage.setItem(this.redirectUrlKey, redirectUrl);
    } else {
      localStorage.removeItem(this.redirectUrlKey);
    }
  }

  getRedirectUrl() {
    return localStorage.getItem(this.redirectUrlKey);
  }

  getToken() {
    const tokenStr = localStorage.getItem(this.tokenKey);

    return tokenStr ? (JSON.parse(tokenStr) as Token) : null;
  }

  isAuthorized() {
    return this.getToken() !== null;
  }

  authenticate() {
    window.location.href = this.authenticationUrl;
  }

  authorize(code: string) {
    const body = {
      client_id: environment.accessKey,
      client_secret: environment.secretKey,
      redirect_uri: environment.authUrl,
      code,
      grant_type: 'authorization_code',
    };

    this.http.post<Token>(this.authorizationUrl, body).subscribe((token) => {
      this.saveToken(token);
      this.authSubject.next(token);
    });
  }

  unauthorize() {
    this.clearToken();
    this.authSubject.next(null);
    window.location.href = environment.originUrl;
  }
}
