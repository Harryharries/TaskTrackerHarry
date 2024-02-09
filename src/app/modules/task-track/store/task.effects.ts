import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { TaskTrackService } from 'app/modules/task-track/services/task-track.service';

@Injectable()
export class TaskEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    switchMap(() => this.taskTrackService.getTasks()
      .pipe(
        map(tasks => TaskActions.loadTasksSuccess({ tasks })),
        catchError(error => of(TaskActions.loadTasksFailure({ error })))
      ))
    )
  );

  // Define more effects for Add, Update, and Delete operations

  constructor(
    private actions$: Actions,
    private taskTrackService: TaskTrackService
  ) {}
}
