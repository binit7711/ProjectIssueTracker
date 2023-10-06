import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Issue,
  IssueCreate,
  IssueCreateWithid,
} from '../components/issue/issue.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

export type IssueState = {
  issues: Issue[];
};

@Injectable()
export class IssuesStore {
  private readonly state: WritableSignal<IssueState> = signal({
    issues: [],
  });

  private readonly httpClient = inject(HttpClient);
  issues = computed(() => this.state().issues);

  setIssues(issues: Issue[]) {
    this.state.set({ issues });
  }

  getIssuesForProject(projectId: string) {
    this.httpClient
      .get<Issue[]>(`${environment.baseUrl}/projects/${projectId}/issues`)
      .subscribe({
        next: (value) => this.state.set({ issues: value }),
        error: (e) => console.log(e),
      });
  }

  createIssueForProject(projectId: string, issue: IssueCreate) {
    this.httpClient
      .post(`${environment.baseUrl}/projects/${projectId}/issues`, {
        ...issue,
      })
      .subscribe({
        next: (_) => this.getIssuesForProject(projectId),
      });
  }

  updateIssueForProject(projectId: string, issue: IssueCreateWithid) {
    this.httpClient
      .put(`${environment.baseUrl}/projects/${projectId}/issues/${issue.id}`, {
        ...issue,
      })
      .subscribe({
        next: (_) => this.getIssuesForProject(projectId),
      });
  }
}
