import { ActionReducerMap } from '@ngrx/store';
import { RootState } from './app.state';
import { taskReducer } from 'app/modules/task-track/store/task.reducer';

export const appReducers: ActionReducerMap<RootState> = {
    taskState: taskReducer
};
