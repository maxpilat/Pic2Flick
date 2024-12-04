import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, delay } from 'rxjs';

export type Token = {
  access_token: string;
  created_at: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  user_id: number;
  username: string;
};

export type BgImage = {
  url: string;
  colors: string[];
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  login(email: string, password: string): Observable<any> {
    return of(true).pipe(delay(1000));
  }

  signup(email: string, username: string, password: string): Observable<any> {
    return of(true).pipe(delay(1000));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
