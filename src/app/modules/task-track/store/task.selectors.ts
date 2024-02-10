import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.state';
import { Task, TaskState as DataTaskState} from 'app/shared/API-proxy/models/task';
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

export const selectDialogTaskSuccess = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.dialogTaskSuccess as boolean
);

export const selectError = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.error as HttpErrorResponse
);

export const selectTotalEstimatedHoursPlanned = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.tasks
    .filter(task => task.state === DataTaskState.Planned)
    .reduce((total, task) => total + task.estimate, 0)
);

// Selector for "In Progress" tasks
export const selectTotalEstimatedHoursInProgress = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.tasks
    .filter(task => task.state === DataTaskState.InProgress)
    .reduce((total, task) => total + task.estimate, 0)
);

// Selector for "Completed" tasks
export const selectTotalEstimatedHoursCompleted = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.tasks
    .filter(task => task.state === DataTaskState.Completed)
    .reduce((total, task) => total + task.estimate, 0)
);
