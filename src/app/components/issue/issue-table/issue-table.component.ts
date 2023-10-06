import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { IssuesStore } from 'src/app/services/issues.store';
import { Issue, IssueCreate } from '../issue.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateDialogComponent } from '../create-or-update-dialog/create-or-update-dialog.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-issue-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss'],
})
export class IssueTableComponent implements OnInit {
  private readonly issuesService = inject(IssuesStore);
  private dialog = inject(MatDialog);
  private dialogRef = inject;
  private id!: string;
  private routeSub!: Subscription;
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe({
      next: (params) => {
        console.log(params);
        console.log(params['id']);
        this.id = params['id'];
      },
    });
  }
  @Input() issues!: Issue[];

  editIssue(issue: IssueCreate) {
    const dialogRef = this.dialog.open(CreateOrUpdateDialogComponent, {
      data: {
        ...issue,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.issuesService.updateIssueForProject(this.id, result.data);
    });
  }
}
