import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://172.20.10.3:3330/api/auth/users';

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return of(true);
  }

  signup(email: string, username: string, password: string): Observable<any> {
    const payload = {
      email,
      username,
      password,
    };

    return this.http.post(`${this.authUrl}/register`, payload);
  }

  logout(): void {
    // Удаление токена и сброс состояния пользователя
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
