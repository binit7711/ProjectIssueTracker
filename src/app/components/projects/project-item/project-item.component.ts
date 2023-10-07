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
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../forms/add-collaborator/add-collaborator.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CreateOrUpdateDialogComponent } from 'src/app/components/issue/create-or-update-dialog/create-or-update-dialog.component';
import { IssuesStore } from 'src/app/services/issues.store';
import { IssueCreate } from '../../issue/issue.model';
import { IssueTableComponent } from '../../issue/issue-table/issue-table.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-project-item',
  standalone: true,
  providers: [],
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    IssueTableComponent,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzPaginationModule,
  ],
})
export class ProjectItemComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private routeSub!: Subscription;
  issuesService = inject(IssuesStore);
  private readonly dialog = inject(MatDialog);
  private readonly projectStore = inject(ProjectsStore);
  private readonly authService = inject(AuthService);
  issues = this.issuesService.issues;
  issuesCount = this.issuesService.totalIssues;
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
            // this.issuesService.setIssues(value.issues);
            this.issuesService.getIssuesForProject(this.id, 1);
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

  openIssueCreateDialog() {
    const dialogRef = this.dialog.open(CreateOrUpdateDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: { data: IssueCreate }) => {
      this.issuesService.createIssueForProject(this.id, result.data);
    });
  }
}
