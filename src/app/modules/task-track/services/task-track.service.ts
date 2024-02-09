import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from 'app/shared/API-proxy/models/task';
import { TaskService } from 'app/shared/API-proxy/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskTrackService {

  constructor(private taskService: TaskService) { }

  getTasks(): Observable<Task[]> {
    return this.taskService.getTasks().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching tasks', error.message);
        return throwError(() => error as HttpErrorResponse);
      })
    );
  }

  getTaskDetails(id: string): Observable<Task> {
    return this.taskService.getTask(id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(`Error fetching task with id ${id}`, error.message);
        return throwError(() => error as HttpErrorResponse);
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.taskService.addTask(task).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding task', error.message);
        return throwError(() => error as HttpErrorResponse);
      })
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.taskService.updateTask(task).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating task', error.message);
        return throwError(() => error as HttpErrorResponse);
      })
    );
  }

  deleteTask(id: string): Observable<Task> {
    return this.taskService.deleteTask(id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(`Error deleting task with id ${id}`, error.message);
        return throwError(() => error as HttpErrorResponse);
      })
    );
  }
}
