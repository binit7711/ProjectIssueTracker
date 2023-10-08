import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueTableComponent } from '../issue-table/issue-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { IssuesStore } from 'src/app/services/issues.store';
import { ProjectsStore } from 'src/app/services/projects.store';
import { ViewModalComponent } from '../../collaboration/view-modal/view-modal.component';
import { CreateOrUpdateDialogComponent } from '../create-or-update-dialog/create-or-update-dialog.component';
import { Issue, IssueCreate } from '../issue.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import {
  NzPaginationComponent,
  NzPaginationModule,
} from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-created-issues',
  standalone: true,
  imports: [CommonModule, IssueTableComponent, NzPaginationModule],
  providers: [NzModalService],
  template: `
    <div class="w-full h-[80vh]">
      <h3 class="font-bold text-medium">Created Issues</h3>
      <app-issue-table [issues]="state().issues"></app-issue-table>
      <div class=" pr-24 flex justify-end">
        <nz-pagination
          (nzPageIndexChange)="loadIssueByPageNumber($event)"
          [nzPageSize]="state().pageSize"
          [(nzPageIndex)]="state().pageNumber"
          [nzTotal]="state().totalCount"
        >
          >
        </nz-pagination>
      </div>
    </div>
  `,
  styles: [
    `
      nz-pagination {
        position: absolute;
        bottom: 5rem;
      }
    `,
  ],
})
export class CreatedIssuesComponent implements OnInit {
  private readonly httpClient = inject(HttpClient);
  state: WritableSignal<{
    issues: Issue[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
  }> = signal({
    issues: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
  });
  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues() {
    this.httpClient
      .get<{ count: number; issues: Issue[] }>(
        `${environment.baseUrl}/projects/issues?pageSize=${
          this.state().pageSize
        }&pageNumber=${this.state().pageNumber}`
      )
      .subscribe({
        next: (v) => {
          this.state.mutate((value) => {
            value.issues = v.issues;
            value.totalCount = v.count;
          });
        },
      });
  }

  loadIssueByPageNumber(pageNum: number) {
    this.state.mutate((v) => {
      v.pageNumber = Number(pageNum);
    });
    this.loadIssues();
  }
}
