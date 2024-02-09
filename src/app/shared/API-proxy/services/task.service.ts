import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'app/shared/API-proxy/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  getTask(id: string): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task);
  }

  deleteTask(id: string): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url);
  }
}
