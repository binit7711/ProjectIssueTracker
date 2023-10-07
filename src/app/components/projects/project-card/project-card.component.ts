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
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    NzGridModule,
    NzCardModule,
    NzTypographyModule,
    NzButtonModule,
  ],

  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  animations: [
    trigger('hoverBorder', [
      // state('initial', style({ borderColor: 'transparent' })),
      // state('hovered', style({ borderColor: '#007bff' })),
      // transition('initial => hovered', animate('0.3s')),
      // transition('hovered => initial', animate('0.3s')),
    ]),
  ],
})
export class ProjectCardComponent {
  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly projectStore = inject(ProjectsStore);

  hoverState = 'initial';

  toggleHoverState() {
    this.hoverState = this.hoverState === 'initial' ? 'hovered' : 'initial';
  }

  @Input() project: Omit<Project, 'issues'> = {
    id: '',
    name: '',
    description: '',
    ownerName: '',
  };
  navigate() {
    this.router.navigate(['/home/your-projects', this.project.id]);
  }

  deleteProject(project: Omit<Project, 'issues'>) {
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
