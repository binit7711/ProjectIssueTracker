import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.route';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes)],
};
