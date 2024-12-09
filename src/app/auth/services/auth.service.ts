import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, delay } from 'rxjs';

export type AuthData = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
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

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();

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

  login(name: string, password: string): Observable<AuthData> {
    const res = this.http.post<AuthData>(
      `${this.authUrl}`,
      { name, password },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvN05RSHkycTZyMUYyUVNpaHJOZ2Y2YUlXZWhFQjVyWEUwNF8wR3VURkk0In0.eyJleHAiOjE3MzM3NTQzNjQsImlhdCI6MTczMzc1MzQ2NCwianRpIjoiMThiNWYxNTEtNWU1YS00MWVhLTljOTItNTgxMjc2YTQyNjQ5IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL3AyZiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyOGViMjIzMy1lYzczLTQxMTMtYmIyOS05ZjE2NGQ3MTUxOWMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoLXNlcnYiLCJzaWQiOiI0NTlkYTkyNC02ZjYxLTQ1NmEtOWEzMS1iZGIxZjJjMTlkZjQiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtcDJmIiwiUk9MRV9VU0VSIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoibWF4cGlsYXQgbWF4cGlsYXQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXhwaWxhdCIsImdpdmVuX25hbWUiOiJtYXhwaWxhdCIsImZhbWlseV9uYW1lIjoibWF4cGlsYXQiLCJlbWFpbCI6InBpbGF0bWRAb3V0bG9vay5jb20ifQ.Ndf9tZnPgg9Nct9fWEeBXNK-F1vmtR_WEHYSXgJkEjYnc_dhxZAuBKsUVXDzzyxz1PZ6SNvL_t0qZWxr5kqExyBjb4uwfi8D_UqYoY8hfH2NAm-37NSc0DAreYqhg9XIiy1ZME--cfQUOmanfN_zBn7qy6M5bj-Mm_Krspc7NtCq-6mnVm_yf7X0DcoWqcE7ANrVQ2HTiZ3esvhq2YH2_r8jvaaesmtqJuR6L1WbNyXCdRM-phm4oYp_wg0zhS43HCv8-z7vvceYqLnOpJOd8pEi5JCMMeP4yX6nApuXPKV7sjiEh6a6YbEKO1wLNiVm8W-pabxcEfGfH6poOcPmpw`,
        },
      }
    );
    res.subscribe({
      next: (data) => {
        localStorage.setItem('token', data.access_token);
        this.currentUserSubject.next({ ...data, name });
      },
    });
    return res;
  }

  signup(email: string, username: string, password: string): Observable<any> {
    return of(true).pipe(delay(1000));
  }

  signout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getUser() {
    return {
      name: 'username',
    };
  }
}
