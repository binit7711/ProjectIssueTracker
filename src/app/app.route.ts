import { Router, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard, isLoggedIn } from './services/auth.constant';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [isLoggedIn],
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
    canActivate: [isLoggedIn],
  },
];
