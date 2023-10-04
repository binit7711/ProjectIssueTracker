import { Route } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectItemComponent } from './project-item/project-item.component';

export const routes: Route[] = [
  { path: 'your-projects', component: ProjectsComponent },
  { path: 'your-projects/:id', component: ProjectItemComponent },
];