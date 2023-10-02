import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, LoginComponent, RouterModule],
})
export class AppComponent {
  title = 'ProjectIssueTracker';
}
