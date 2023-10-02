import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthState, User, UserLogin, UserRegister } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  // private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  authState: WritableSignal<AuthState> = signal({
    token: '',
    user: {
      email: '',
      id: '',
      name: '',
    },
  });

  login(user: UserLogin) {
    return this.httpClient.post<{ token: string; user: User }>(
      'https://localhost:7268/api/auth/login',
      user
    );
  }
  register(user: UserRegister): void {}
}
