import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.state';
import { Task } from 'app/shared/API-proxy/models/task';
import { HttpErrorResponse } from '@angular/common/http';

export const taskFeatureKey = 'taskState';
export const selectTaskFeature = createFeatureSelector<TaskState>(taskFeatureKey);

export const selectTasks = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.tasks as Task[]
);

export const selectCurrentTask = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.currentTask as Task
);

export const selectLoading = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.loading as boolean
);

export const selectError = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.error as HttpErrorResponse
);
