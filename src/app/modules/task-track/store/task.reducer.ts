import { Action, MetaReducer, createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { TaskState, initialState } from './task.state';

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
    error: null
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TaskActions.loadTaskDetails, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.loadTaskDetailsSuccess, (state, { task }) => ({
    ...state,
    currentTask: task,
    loading: false,
    error: null
  })),
  on(TaskActions.loadTaskDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TaskActions.resetDialog, state => ({
    ...state,
    dialogTaskSuccess: false
  })),
  // Handle add task
  on(TaskActions.addTask, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    loading: false,
    dialogTaskSuccess: true
  })),
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Handle update task
  on(TaskActions.updateTask, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    loading: false
  })),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Handle delete task
  on(TaskActions.deleteTask, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    loading: false
  })),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export function TaskReducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}

export const metaReducers: MetaReducer<TaskState>[] = [];
