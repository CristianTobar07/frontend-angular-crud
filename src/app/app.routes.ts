import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  { path: '**', redirectTo: 'home-page' },
];
