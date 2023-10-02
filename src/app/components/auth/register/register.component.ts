import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin, UserRegister } from 'src/app/services/user.model';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  user!: UserRegister;
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.initRegisterForm();
  }
  initRegisterForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.email] }),
      password: new FormControl('', {
        validators: [Validators.minLength(8)],
      }),
      name: new FormControl('', { validators: [Validators.minLength(1)] }),
    });
  }
  register(): void {
    if (this.registerForm.errors) {
      console.log(this.registerForm.errors);
      // this.authService.register(this.registerForm.value);
    }
  }
}
