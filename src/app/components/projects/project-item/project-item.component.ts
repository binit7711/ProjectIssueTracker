import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {
  ProjectWithOwnerId,
  ProjectsStore,
} from 'src/app/services/projects.store';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../forms/add-collaborator/add-collaborator.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule],
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private routeSub!: Subscription;
  private readonly dialog = inject(MatDialog);
  private readonly projectStore = inject(ProjectsStore);
  private readonly authService = inject(AuthService);
  private id!: string;
  project!: ProjectWithOwnerId;
  isOwner: boolean = false;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe({
      next: (params) => {
        console.log(params);
        console.log(params['id']);
        this.id = params['id'];
        this.projectStore.getProject(this.id).subscribe({
          next: (value) => {
            this.project = value;
            if (this.project.ownerId == this.authService.getUser().id) {
              this.isOwner = true;
            }
          },
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  openAddCollaboratorDialog() {
    const dialogRef = this.dialog.open(AddCollaboratorComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
