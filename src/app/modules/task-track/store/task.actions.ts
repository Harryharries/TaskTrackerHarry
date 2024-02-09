import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Task } from 'app/shared/API-proxy/models/task';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadTaskDetails = createAction(
  '[Task] Load Task Details',
  props<{ id: string }>()
);

export const loadTaskDetailsSuccess = createAction(
  '[Task] Load Task Details Success',
  props<{ task: Task }>()
);

export const loadTaskDetailsFailure = createAction(
  '[Task] Load Task Details Failure',
  props<{ error: HttpErrorResponse }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: Task }>()
);

export const addTaskFailure = createAction(
  '[Task] Add Task Failure',
  props<{ error: HttpErrorResponse }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: Task }>()
);

export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: HttpErrorResponse }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>()
);

export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: HttpErrorResponse }>()
);
