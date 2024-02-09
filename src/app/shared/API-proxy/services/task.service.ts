import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Task } from 'app/shared/API-proxy/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const mockError = false;
    if (mockError) {
      return throwError(() => new HttpErrorResponse({status: 404, statusText: 'Not Found', error: {message: 'Tasks not found'}}));
    }

    return this.http.get<Task[]>(this.tasksUrl);
  }

  getTask(id: string): Observable<Task> {
    const mockError = false;
    if (mockError) {
      return throwError(() => new HttpErrorResponse({status: 404, statusText: 'Not Found', error: {message: 'Tasks not found'}}));
    }

    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  addTask(task: Task): Observable<Task> {
    const mockError = false;
    if (mockError) {
      return throwError(() => new HttpErrorResponse({status: 404, statusText: 'Not Found', error: {message: 'Tasks not found'}}));
    }

    return this.http.post<Task>(this.tasksUrl, task);
  }

  updateTask(task: Task): Observable<any> {
    const mockError = false;
    if (mockError) {
      return throwError(() => new HttpErrorResponse({status: 404, statusText: 'Not Found', error: {message: 'Tasks not found'}}));
    }

    return this.http.put(this.tasksUrl, task);
  }

  deleteTask(id: string): Observable<Task> {
    const mockError = false;
    if (mockError) {
      return throwError(() => new HttpErrorResponse({status: 404, statusText: 'Not Found', error: {message: 'Tasks not found'}}));
    }

    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url);
  }
}
