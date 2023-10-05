import {
  Inject,
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Project } from '../components/projects/project.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

export type ProjectsState = {
  projects: Project[];
};

type ProjectCreate = Omit<Project, 'id' | 'ownerName'> & {
  ownerId: string;
};

export type ProjectWithOwnerId = Project & {
  ownerId: string;
};

@Injectable()
export class ProjectsStore {
  private readonly authService = inject(AuthService);
  private readonly httpClient = inject(HttpClient);
  private state: WritableSignal<ProjectsState> = signal<ProjectsState>({
    projects: [],
  });

  projects = computed(() => this.state().projects);

  fetchProjectsForUser(): void {
    this.httpClient
      .get<Project[]>(
        `${environment.baseUrl}/projects/user/${this.authService.getUser().id}`
      )
      .subscribe({
        next: (value) => {
          this.state.set({ projects: value });
          console.log('called from fetchprojects', this.projects());
          console.log(value);
        },
      });
  }

  createProjectForUser(project: ProjectCreate): void {
    this.httpClient
      .post(`${environment.baseUrl}/projects`, {
        ...project,
      })
      .subscribe({
        next: (_) => this.fetchProjectsForUser(),
      });
  }

  deleteProjectForUser(projectId: string) {
    this.httpClient
      .delete('https://localhost:7268/api/projects/' + projectId, {})
      .subscribe({
        next: (_) => this.fetchProjectsForUser(),
      });
  }

  getProject(projectId: string) {
    console.log(projectId);
    return this.httpClient.get<ProjectWithOwnerId>(
      'https://localhost:7268/api/projects/' + projectId
    );
  }

  // addCollaboratorToProject({projectId:number,userId:number}){
  //   this.httpClient.post("https://localhost:7268/api/projects/user")
  // }
}
