import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User, UserLogin } from 'src/app/services/user.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  user!: UserLogin;
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.email] }),
      password: new FormControl('', {
        validators: [Validators.minLength(8)],
      }),
    });
  }
  login(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.authService.authState.set(data);

        this.router.navigate(['home']);

        console.log('test');
      },
      error: (err) => {
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
      },
    });
  }
}
