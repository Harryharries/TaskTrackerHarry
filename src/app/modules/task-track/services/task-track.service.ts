import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from 'app/shared/API-proxy/models/task';
import { TaskService } from 'app/shared/API-proxy/services/task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskTrackService {

  constructor(private taskService: TaskService) { }

  getTasks(): Observable<Task[]> {
    return this.taskService.getTasks().pipe(
      catchError(error => {
        console.error('Error fetching tasks', error);
        return throwError(() => new Error('Error fetching tasks'));
      })
    );
  }

  getTask(id: string): Observable<Task> {
    return this.taskService.getTask(id).pipe(
      catchError(error => {
        console.error(`Error fetching task with id ${id}`, error);
        return throwError(() => new Error(`Error fetching task with id ${id}`));
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.taskService.addTask(task).pipe(
      catchError(error => {
        console.error('Error adding task', error);
        return throwError(() => new Error('Error adding task'));
      })
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.taskService.updateTask(task).pipe(
      catchError(error => {
        console.error('Error updating task', error);
        return throwError(() => new Error('Error updating task'));
      })
    );
  }

  deleteTask(id: string): Observable<Task> {
    return this.taskService.deleteTask(id).pipe(
      catchError(error => {
        console.error(`Error deleting task with id ${id}`, error);
        return throwError(() => new Error(`Error deleting task with id ${id}`));
      })
    );
  }
}
