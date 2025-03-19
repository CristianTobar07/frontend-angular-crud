import { Component } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, TaskFormComponent, TaskListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
