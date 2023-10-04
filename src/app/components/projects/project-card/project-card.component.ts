import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../project.model';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ProjectsStore } from 'src/app/services/projects.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly projectStore = inject(ProjectsStore);
  @Input() project: Project = {
    id: '',
    name: '',
    description: '',
    ownerName: '',
  };
  navigate() {
    this.router.navigate(['/home/your-projects', this.project.id]);
  }
  deleteProject(project: Project) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        ...project,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        this.projectStore.deleteProjectForUser(project.id);
      }
    });
  }
}
