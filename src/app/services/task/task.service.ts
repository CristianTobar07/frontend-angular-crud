import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../../common/contants';
import { ResponseGetAllTasks, Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _dataTasks$ = new BehaviorSubject<Task[]>([]);
  private _createTask$ = new BehaviorSubject<boolean | null>(null);
  private _deleteTask$ = new BehaviorSubject<boolean | null>(null);
  private _updateTas$ = new BehaviorSubject<boolean | null>(null);
  private selectedTaskSubject = new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    this.http.get<ResponseGetAllTasks>(BASE_URL + 'tasks/all_tasks').subscribe({
      next: (response) => {
        this._dataTasks$.next(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
    return this._dataTasks$.asObservable();
  }

  setSelectedTask(task: Task): void {
    this.selectedTaskSubject.next(task);
  }

  getSelectedTask(): Observable<Task> {
    return this.selectedTaskSubject.asObservable();
  }

  addTask(name: string, description: string): Observable<boolean | null> {
    const body = {
      name,
      description,
      status: 1,
    };

    this.http.post(BASE_URL + 'tasks/create', body).subscribe({
      next: (response) => {
        this._createTask$.next(true);
        this.getAllTasks();
      },
      error: (error) => {
        this._createTask$.next(null);
      },
    });
    return this._createTask$.asObservable();
  }

  updateTask(name: string, description: string, status: number, uid: string) {
    const body = {
      name,
      description,
      status,
    };

    this.http.put(BASE_URL + 'tasks/update/' + uid, body).subscribe({
      next: (response) => {
        this._updateTas$.next(true);
        this.getAllTasks();
      },
      error: (error) => {
        this._updateTas$.next(null);
      },
    });
    return this._updateTas$.asObservable();
  }

  deleteTask(id: string) {
    this.http.delete(BASE_URL + 'tasks/delete/' + id).subscribe({
      next: (response) => {
        this._deleteTask$.next(true);
      },
      error: (error) => {
        this._deleteTask$.next(false);
      },
    });
    return this._deleteTask$.asObservable();
  }
}
