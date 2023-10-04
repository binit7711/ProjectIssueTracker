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

export type ProjectsState = {
  projects: Project[];
};

type ProjectCreate = Omit<Project, 'id' | 'ownerName'> & {
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
        'https://localhost:7268/api/projects/user/' +
          this.authService.getUser().id
      )
      .subscribe({
        next: (value) => {
          this.state.set({ projects: value });
          console.log('called from fetchprojects', this.projects());
        },
      });
  }

  createProjectForUser(project: ProjectCreate): void {
    this.httpClient
      .post('https://localhost:7268/api/projects/user/', {
        ...project,
      })
      .subscribe({
        next: (_) => this.fetchProjectsForUser(),
      });
  }
}
