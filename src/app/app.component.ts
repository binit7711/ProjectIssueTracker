import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    LoginComponent,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
})
export class AppComponent {
  title = 'ProjectIssueTracker';
  constructor(private _snackBar: MatSnackBar) {}
}
