import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { Observable, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as TaskActions from './store/task.actions';
import * as TaskSelectors from './store/task.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { TaskPageComponent } from "./components/task-page/task-page.component";

import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
@Component({
    selector: 'app-task-track',
    standalone: true,
    templateUrl: './task-track.component.html',
    styleUrl: './task-track.component.scss',
    imports: [CommonModule, TaskPageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTrackComponent implements OnInit {
  tasks$: Observable<Task[]> = this.store.select(TaskSelectors.selectTasks).pipe(startWith([]), takeUntilDestroyed());
  totalPlanned$: Observable<number> = this.store.select(TaskSelectors.selectTotalEstimatedHoursPlanned).pipe(startWith(0), takeUntilDestroyed());
  totalInProgress$: Observable<number> = this.store.select(TaskSelectors.selectTotalEstimatedHoursInProgress).pipe(startWith(0), takeUntilDestroyed());
  totalCompleted$: Observable<number> = this.store.select(TaskSelectors.selectTotalEstimatedHoursCompleted).pipe(startWith(0), takeUntilDestroyed());
  loading$: Observable<boolean> = this.store.select(TaskSelectors.selectLoading).pipe(startWith(false), takeUntilDestroyed());

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  openCreateDialog(): void {
    this.dialog.open(TaskDialogComponent, {
      panelClass: 'dialog-container',
      maxWidth: '80vw',
      minWidth: '580px',
      width: '550px',
    });
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
