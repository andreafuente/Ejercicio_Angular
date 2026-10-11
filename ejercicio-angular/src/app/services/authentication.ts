import { Service, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, delay } from 'rxjs';

@Service()
export class Authentication {
  private router = inject(Router);
  private logged: boolean = false;
  private username: string = '';

  login({ username, password }: { username: string; password: string }): Observable<boolean> {
    if (username === 'master@lemoncode.net' && password === '12345678') {
      this.logged = true;
      this.username = username;

      localStorage.setItem('logged', 'true');
      localStorage.setItem('username', username);
      return of(true).pipe(delay(2000));
    }
    this.logged = false;
    this.username = '';
    return of(false).pipe(delay(2000));
  }

  logout(): void {
    this.logged = false;
    this.username = '';
    localStorage.removeItem('logged');
    localStorage.removeItem('username');
     this.router.navigate(['/']);
  }

  isLogged(): boolean {
      if (typeof localStorage === 'undefined') {
    return false;
  }
    this.logged = localStorage.getItem('logged') === 'true';
    this.username = localStorage.getItem('username') || '';
    return this.logged;
  }

  getUsername(): string {
    return this.username;
  }
}
