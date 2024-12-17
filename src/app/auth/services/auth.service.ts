import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export type AuthData = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  name?: string;
};

export type User = {
  name: string;
  password?: string;
  email?: string;
};

export type BgImage = {
  url: string;
  colors: string[];
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = 'http://localhost:3334/api/auth/users';

  private authDataSubject = new BehaviorSubject<AuthData | null>(null);
  authData$: Observable<AuthData | null> = this.authDataSubject.asObservable();

  private images: BgImage[] = [
    {
      url: 'https://i.pinimg.com/736x/ef/ec/65/efec65d2d8912a6e8a929a348891ba59.jpg',
      colors: ['#1a1a1a', '#ffa500'],
    },
    {
      url: 'https://i.pinimg.com/736x/5d/53/9c/5d539cad7e30aa0106ac85ac945037bc.jpg',
      colors: ['#F2F4F8', '#E00028'],
    },
    {
      url: 'https://i.pinimg.com/736x/f4/f8/9f/f4f89fee84eb91e5377aa3420da356b8.jpg',
      colors: ['#1A1F33', '#FF5722'],
    },
  ];

  constructor(private http: HttpClient) {}

  getBg() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  login(name: string, password: string) {
    const res = this.http.post<AuthData>(`${this.authUrl}`, { name, password });
    res.subscribe({
      next: (data) => {
        localStorage.setItem('token', data.access_token);
        this.authDataSubject.next({ ...data, name });
      },
    });
    return res;
  }

  signup(email: string, name: string, password: string) {
    const res = this.http.post<AuthData>(`${this.authUrl}/register`, { email, name, password });
    res.subscribe({
      next: (data) => {
        localStorage.setItem('token', data.access_token);
        this.authDataSubject.next({ ...data, name });
      },
    });
    return res;
  }

  signout() {
    localStorage.removeItem('token');
    this.authDataSubject.next(null);
  }

  getAuthData() {
    return this.authDataSubject.getValue();
  }
}
