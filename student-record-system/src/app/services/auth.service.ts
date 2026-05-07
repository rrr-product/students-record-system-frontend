import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkInitialLoginState());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private checkInitialLoginState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(userId: string, pass: string): Observable<boolean> {
    return this.http.post<{ message: string, userId: string }>(`${this.apiUrl}/login`, { userId, password: pass })
      .pipe(
        tap(() => {
          localStorage.setItem('isLoggedIn', 'true');
          this.isLoggedInSubject.next(true);
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}
