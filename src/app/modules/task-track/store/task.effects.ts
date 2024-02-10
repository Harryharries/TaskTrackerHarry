import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { TaskTrackService } from 'app/modules/task-track/services/task-track.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from 'app/shared/API-proxy/models/task';

@Injectable()
export class TaskEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    switchMap(() => this.taskTrackService.getTasks().pipe(
      map(tasks => TaskActions.loadTasksSuccess({ tasks })),
      catchError(
        (error: HttpErrorResponse) => of(TaskActions.loadTasksFailure({ error }))
      )
    ))
  ));

  loadTaskDetails$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTaskDetails),
    mergeMap(({ id }) =>
      this.taskTrackService.getTaskDetails(id).pipe(
        map(task => TaskActions.loadTaskDetailsSuccess({ task })),
        catchError(error => of(TaskActions.loadTaskDetailsFailure({ error })))
      )
    )
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.addTask),
    concatMap(({ task }: { task: Task }) =>
      this.taskTrackService.addTask(task).pipe(
        map((newTask: Task) => TaskActions.addTaskSuccess({ task: newTask })),
        catchError((error: HttpErrorResponse) => of(TaskActions.addTaskFailure({ error })))
      )
    )
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.updateTask),
    mergeMap(({ task }: { task: Task }) =>
      this.taskTrackService.updateTask(task).pipe(
        map(() => TaskActions.updateTaskSuccess({ task })),
        catchError((error: HttpErrorResponse) => of(TaskActions.updateTaskFailure({ error })))
      )
    )
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTask),
    mergeMap(({ id }: { id: string }) =>
      this.taskTrackService.deleteTask(id).pipe(
        map(() => TaskActions.deleteTaskSuccess({ id })),
        catchError((error: HttpErrorResponse) => of(TaskActions.deleteTaskFailure({ error })))
      )
    )
  ));
    // Trigger loadRequests action after add, update, or delete operation
    refetchRequests$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(
          TaskActions.deleteTaskSuccess,
          TaskActions.updateTaskSuccess,
          TaskActions.addTaskSuccess
        ),
        switchMap(() => of(TaskActions.loadTasks()))
      );
    });

    refetchDialog$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(
          TaskActions.addTaskSuccess
        ),
        switchMap(() => of(TaskActions.resetDialog()))
      );
    });

  constructor(
    private actions$: Actions,
    private taskTrackService: TaskTrackService
  ) {}
}
