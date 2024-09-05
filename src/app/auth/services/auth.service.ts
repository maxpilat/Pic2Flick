import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { API } from '../constants/api.constant';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Token } from '../models/auth.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  private tokenUrl = `${environment.unsplashUrl}${API.tokenUrl}`;
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

  setRedirectUrl(redirectUrl: string) {
    localStorage.setItem(this.redirectUrlKey, redirectUrl);
  }

  getRedirectUrl() {
    return localStorage.getItem(this.redirectUrlKey);
  }

  getToken() {
    const tokenStr = localStorage.getItem(this.tokenKey);

    return tokenStr ? (JSON.parse(tokenStr) as Token) : null;
  }

  getAuthUrl(redirectUrl: string = environment.originUrl) {
    return `${environment.unsplashUrl}${API.authUrl}?client_id=${environment.accessKey}&redirect_uri=${redirectUrl}&response_type=code`;
  }

  isAuthorized() {
    return this.getToken() !== null;
  }

  authorize(redirectUrl: string) {
    this.route.queryParams.pipe().subscribe((params) => {
      const code = params['code'];
      if (code) console.log(code);

      // const body = {
      //   client_id: environment.accessKey,
      //   client_secret: environment.secretKey,
      //   redirect_uri: environment.originUrl,
      //   code,
      //   grant_type: 'authorization_code',
      // };

      // this.http.post<Token>(this.tokenUrl, body).subscribe((token) => {
      //   this.saveToken(token);
      //   this.authSubject.next(token);
      //   // window.location.href = redirectUrl;
      // });
    });

    window.location.href = this.getAuthUrl();
  }

  unauthorize() {
    this.clearToken();
    this.authSubject.next(null);
    this.router.navigateByUrl(environment.originUrl);
  }
}
