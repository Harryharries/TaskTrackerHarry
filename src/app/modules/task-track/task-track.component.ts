import { Component, OnInit} from '@angular/core';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { Observable} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as TaskActions from './store/task.actions';
import * as TaskSelectors from './store/task.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-track',
  standalone: true,
  imports: [],
  templateUrl: './task-track.component.html',
  styleUrl: './task-track.component.scss'
})
export class TaskTrackComponent implements OnInit {
  tasks$: Observable<Task[]> = this.store.select(TaskSelectors.selectTasks).pipe(takeUntilDestroyed());
  task$: Observable<Task> = this.store.select(TaskSelectors.selectCurrentTask).pipe(takeUntilDestroyed());

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.tasks$.subscribe((tasks)=>{
      console.log(tasks);
    })

    const testTask = { id: '1', name: 'Ta22 2', description: 'Task 1 Description', estimate: 2, state: TaskState.Planned }
    this.addTask(testTask)
    // this.store.dispatch(TaskActions.updateTask({task: testTask}));
    // this.store.dispatch(TaskActions.deleteTask({id: "1"}));
  }

  loadTasks(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  loadTaskDetails(id: string): void {
    this.store.dispatch(TaskActions.loadTaskDetails({ id }));
  }

  addTask(task: Task): void {
    this.store.dispatch(TaskActions.addTask({ task }));
  }

  updateTask(task: Task): void {
    this.store.dispatch(TaskActions.updateTask({ task }));
  }

  deleteTask(id: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }
}
