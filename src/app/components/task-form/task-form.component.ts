import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task/task.service';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  selectedTask$: Observable<Task>;
  uidTaskSelected: string = '';

  private suscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [1, Validators.required],
    });

    this.selectedTask$ = this.taskService.getSelectedTask();
  }

  ngOnInit(): void {
    this.selectedTask$.subscribe((task: Task) => {
      if (task) {
        this.taskForm.patchValue({
          title: task.name,
          description: task.description,
          status: task.status,
        });
        this.uidTaskSelected = task.uid;
      }
    });
  }

  submit(): void {
    if (!this.selectedTask$) {
      this.taskForm.get('status')?.setValue(1);
      if (this.taskForm.valid) {
        this.suscription = this.taskService
          .addTask(
            this.taskForm.value['title'],
            this.taskForm.value['description']
          )
          .subscribe((res) => {
            if (!res) return;
            this.closeForm();
            this.ngOnDestroy();
          });
      }
    } else {
      this.suscription = this.taskService
        .updateTask(
          this.taskForm.value['title'],
          this.taskForm.value['description'],
          this.taskForm.value['status'],
          this.uidTaskSelected
        )
        .subscribe((res) => {
          if (!res) return;
          this.closeForm();
          this.ngOnDestroy();
        });
    }
  }

  closeForm() {
    this.taskForm.reset();
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
