import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://example.com/api'; // Замените на ваш API URL
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // const body = { email, password };
    // return this.http.post<any>(`${this.apiUrl}/auth/login`, body).pipe(
    //   tap((response) => {
    //     // Сохранение токена и информации о пользователе
    //     if (response && response.token) {
    //       localStorage.setItem('token', response.token);
    //       this.currentUserSubject.next(response.user); // Предполагается, что ответ содержит информацию о пользователе
    //     }
    //   }),
    //   catchError(this.handleError) // Обработка ошибок
    // );

    return of(true);
  }

  logout(): void {
    // Удаление токена и сброс состояния пользователя
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  register(email: string, password: string) {}

  isAuthenticated(): boolean {
    // Проверка, есть ли токен
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  private handleError(error: HttpErrorResponse) {
    // Обработка ошибок HTTP
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
