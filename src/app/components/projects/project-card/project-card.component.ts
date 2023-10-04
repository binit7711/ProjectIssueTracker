import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../project.model';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project: Project = {
    id: '',
    name: '',
    description: '',
    ownerName: '',
  };
  navigate(id: string) {
    console.log(id);
  }
}
