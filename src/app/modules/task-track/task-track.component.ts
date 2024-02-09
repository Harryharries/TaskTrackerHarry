import { Component, OnInit} from '@angular/core';
import { Task } from 'app/shared/API-proxy/models/task';
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

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.tasks$.subscribe((tasks)=>{
      console.log(tasks);
    })
  }

  loadTasks(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }
}
