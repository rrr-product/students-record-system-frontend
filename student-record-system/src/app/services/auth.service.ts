import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkInitialLoginState());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  private checkInitialLoginState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(userId: string, pass: string): boolean {
    if (userId === 'rishi' && pass === 'babu') {
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}
