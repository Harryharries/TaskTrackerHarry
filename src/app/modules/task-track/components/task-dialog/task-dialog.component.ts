import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { Observable, filter, shareReplay, startWith } from 'rxjs';
import * as TaskSelectors from 'app/modules/task-track/store/task.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskData } from '../../models/task';
import * as TaskActions from 'app/modules/task-track/store/task.actions';
import { v4 as uuid } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  task$: Observable<Task> = this.store.select(TaskSelectors.selectCurrentTask).pipe(takeUntilDestroyed());
  loading$: Observable<boolean> = this.store.select(TaskSelectors.selectLoading).pipe(
    startWith(false),
    takeUntilDestroyed(),
    shareReplay(1),
  );
  dialogTaskSuccess$ = this.store.select(TaskSelectors.selectDialogTaskSuccess).pipe(
    takeUntilDestroyed(),
    filter(success => success),
  )
  taskForm!: FormGroup;
  TaskState = ['Planned','In Progress','Completed'];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      TaskDataId: string;
    },
    private store: Store,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
  ){
  }

  ngOnInit(): void {
    this.subscribeToDialogTask();
    this.setupTaskForm()
  }
  subscribeToDialogTask(): void {
    this.dialogTaskSuccess$.subscribe(() => {
      this.close();
    });
  }
  setupTaskForm() : void{
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      estimate: [1, [Validators.required, Validators.min(1)]],
    });
  }

  create(): void {
    if (this.taskForm.valid) {

      const taskData: TaskData = this.taskForm.value
      const newTask: Task = {
        id: uuid(),
        name: taskData.name,
        description: taskData.description,
        estimate: taskData.estimate,
        state: TaskState.Planned
      }

      this.addTask(newTask)
    }
  }

  addTask(task: Task): void {
    this.store.dispatch(TaskActions.addTask({ task }));
  }

  close(): void {
    this.dialogRef.close();
  }

}
