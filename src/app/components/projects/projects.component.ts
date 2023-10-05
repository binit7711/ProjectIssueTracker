import { Component, OnInit, WritableSignal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsStore } from 'src/app/services/projects.store';
import { MatGridListModule } from '@angular/material/grid-list';
import { Project } from './project.model';
import { ProjectCardComponent } from './project-card/project-card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  standalone: true,
  providers: [],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [
    CommonModule,
    ProjectCardComponent,
    MatGridListModule,
    MatDialogModule,
  ],
})
export class ProjectsComponent implements OnInit {
  projectsStore = inject(ProjectsStore);

  projects = this.projectsStore.projects;
  ngOnInit(): void {
    this.projectsStore.fetchProjectsForUser();
  }
}
