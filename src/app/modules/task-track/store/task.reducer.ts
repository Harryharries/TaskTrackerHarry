import { Action, MetaReducer, createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { TaskState, initialState } from './task.state';

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) : TaskState => ({ ...state, loading: true, error: null })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }): TaskState => ({ ...state, loading: false, error: null, tasks })),
  on(TaskActions.loadTasksFailure, (state, { error }): TaskState => ({ ...state, error, loading: false })),
);


export function TaskReducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}

export const metaReducers: MetaReducer<TaskState>[] = [];
