import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskTrackService } from './task-track.service';
import { TaskService } from 'app/shared/API-proxy/services/task.service';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

describe('TaskTrackService', () => {
  let service: TaskTrackService;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', [
      'getTasks',
      'getTask',
      'addTask',
      'updateTask',
      'deleteTask',
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskTrackService,
        { provide: TaskService, useValue: spy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    });

    service = TestBed.inject(TaskTrackService);
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    toastrServiceSpy = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTasks should return expected tasks', (done: DoneFn) => {
    const expectedTasks: Task[] = [
      {
        id: '1',
        name: 'Task 1',
        description: 'Description 1',
        estimate: 5,
        state: TaskState.Planned,
      },
    ];

    taskServiceSpy.getTasks.and.returnValue(of(expectedTasks));

    service.getTasks().subscribe({
      next: (tasks) => {
        expect(tasks).toEqual(expectedTasks, 'expected tasks');
        done();
      },
      error: done.fail,
    });

    expect(taskServiceSpy.getTasks.calls.count()).toBe(1);
  });

  it('getTasks should handle errors', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 404,
      statusText: 'Not Found',
    });

    taskServiceSpy.getTasks.and.returnValue(throwError(() => errorResponse));

    service.getTasks().subscribe({
      next: () => done.fail('expected an error, not tasks'),
      error: (error) => {
        expect(toastrServiceSpy.error.calls.count()).toBe(1);
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });

  it('getTaskDetails should return task details', (done: DoneFn) => {
    const expectedTask: Task = {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      estimate: 5,
      state: TaskState.Planned,
    };

    taskServiceSpy.getTask.and.returnValue(of(expectedTask));

    service.getTaskDetails('1').subscribe({
      next: (task) => {
        expect(task).toEqual(expectedTask);
        done();
      },
      error: done.fail,
    });

    expect(taskServiceSpy.getTask.calls.count()).toBe(1);
    expect(taskServiceSpy.getTask.calls.mostRecent().args[0]).toBe('1');
  });

  it('getTaskDetails should handle errors', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 404,
      statusText: 'Not Found',
    });

    taskServiceSpy.getTask.and.returnValue(throwError(() => errorResponse));

    service.getTaskDetails('1').subscribe({
      next: () => done.fail('expected an error, not task details'),
      error: (error) => {
        expect(toastrServiceSpy.error.calls.count()).toBe(1);
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });

  it('addTask should successfully add a task', (done: DoneFn) => {
    const newTask: Task = {
      id: '2',
      name: 'Task 2',
      description: 'Description 2',
      estimate: 10,
      state: TaskState.Planned,
    };

    taskServiceSpy.addTask.and.returnValue(of(newTask));

    service.addTask(newTask).subscribe({
      next: (task) => {
        expect(task).toEqual(newTask);
        done();
      },
      error: done.fail,
    });

    expect(taskServiceSpy.addTask.calls.count()).toBe(1);
  });

  it('addTask should handle errors', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 500,
      statusText: 'Server Error',
    });

    taskServiceSpy.addTask.and.returnValue(throwError(() => errorResponse));

    service.addTask({} as Task).subscribe({
      next: () => done.fail('expected an error, not success'),
      error: (error) => {
        expect(toastrServiceSpy.error.calls.count()).toBe(1);
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });

  it('updateTask should successfully update a task', (done: DoneFn) => {
    const updatedTask: Task = {
      id: '1',
      name: 'Updated Task 1',
      description: 'Updated Description 1',
      estimate: 8,
      state: TaskState.Completed,
    };

    taskServiceSpy.updateTask.and.returnValue(of(updatedTask));

    service.updateTask(updatedTask).subscribe({
      next: (task) => {
        expect(task).toEqual(updatedTask);
        done();
      },
      error: done.fail,
    });

    expect(taskServiceSpy.updateTask.calls.count()).toBe(1);
    expect(taskServiceSpy.updateTask.calls.mostRecent().args[0]).toEqual(
      updatedTask
    );
  });

  it('updateTask should handle error', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'Error updating task',
      status: 400,
      statusText: 'Bad Request',
    });

    taskServiceSpy.updateTask.and.returnValue(throwError(() => errorResponse));

    service
      .updateTask({
        id: '1',
        name: '',
        description: '',
        estimate: 0,
        state: TaskState.Planned,
      })
      .subscribe({
        next: () => done.fail('expected an error, not task update success'),
        error: (error) => {
          expect(toastrServiceSpy.error.calls.count()).toBe(1);
          expect(error).toBe(errorResponse);
          done();
        },
      });
  });

  it('deleteTask should successfully delete a task', (done: DoneFn) => {
    const taskId = '1';
    const mockTaskResponse: Task = {
      id: taskId,
      name: 'Mock Task',
      description: 'Mock Description',
      estimate: 1,
      state: TaskState.Completed,
    };

    taskServiceSpy.deleteTask.and.returnValue(of(mockTaskResponse));

    service.deleteTask(taskId).subscribe({
      next: (response) => {
        expect(response).toEqual(mockTaskResponse);
        done();
      },
      error: done.fail,
    });

    expect(taskServiceSpy.deleteTask.calls.count()).toBe(1);
    expect(taskServiceSpy.deleteTask.calls.mostRecent().args[0]).toEqual(
      taskId
    );
  });

  it('deleteTask should handle error', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'Error deleting task',
      status: 404,
      statusText: 'Not Found',
    });

    taskServiceSpy.deleteTask.and.returnValue(throwError(() => errorResponse));

    service.deleteTask('1').subscribe({
      next: () => done.fail('expected an error, not task delete success'),
      error: (error) => {
        expect(toastrServiceSpy.error.calls.count()).toBe(1);
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
