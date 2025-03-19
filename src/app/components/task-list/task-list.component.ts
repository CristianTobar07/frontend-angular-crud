import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { NgFor } from '@angular/common';
import { Task } from '../../interfaces/task';
import { StatusTaskPipe } from '../../pipes/tasks/status.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, StatusTaskPipe, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  taskService = inject(TaskService);
  dataTasks: Task[] = [];
  selectedTask: Task | null = null;
  isAddTask = signal<boolean>(false);

  statuses = [1, 2, 3];

  constructor() {
    this.taskService.getSelectedTask().subscribe((task) => {
      this.selectedTask = task;
    });
  }

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.dataTasks = tasks;
    });
  }

  addTask() {
    this.isAddTask.set(true);
  }

  editTask(task: Task) {
    this.taskService.setSelectedTask(task);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe((res) => {
      if (!res) return;
      this.getAllTask();
    });
  }

  updateStatus(task: Task, event: Event) {
    const target = event.target as HTMLSelectElement;

    this.taskService.updateTask(
      task.name,
      task.description,
      +target.value,
      task.uid
    );
  }

  closeForm() {
    this.selectedTask = null;
  }
}
