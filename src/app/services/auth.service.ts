import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserLogin, UserRegister } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly snackBar = inject(MatSnackBar);
  login(user: UserLogin): void {
    this.httpClient
      .post<{ token: string; user: User }>(
        'https://localhost:7268/api/auth/login',
        user
      )
      .subscribe(
        (data) => {},
        (err) => {
          console.log(err);
          this.snackBar.open(
            err?.error?.errors?.['Email'] ||
              err?.error?.errors?.['Password'] ||
              err?.error,
            'Close',
            {
              duration: 3000,
            }
          );
        }
      );
  }
  register(user: UserRegister): void {}
}
