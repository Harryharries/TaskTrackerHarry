import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskTrackService } from './task-track.service';
import { TaskService } from 'app/shared/API-proxy/services/task.service';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { of } from 'rxjs';

describe('TaskTrackService', () => {
  let service: TaskTrackService;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['getTasks', 'getTask', 'addTask', 'updateTask', 'deleteTask']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskTrackService,
        { provide: TaskService, useValue: spy }
      ]
    });

    service = TestBed.inject(TaskTrackService);
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTasks should return expected tasks', (done: DoneFn) => {
    const expectedTasks: Task[] = [
      { id: '1', name: 'Task 1', description: 'Description 1', estimate: 5, state: TaskState.Planned }
    ];

    taskServiceSpy.getTasks.and.returnValue(of(expectedTasks));

    service.getTasks().subscribe({
      next: tasks => {
        expect(tasks).toEqual(expectedTasks);
        done();
      },
      error: done.fail
    });
    expect(taskServiceSpy.getTasks.calls.count()).toBe(1);
  });

  it('getTask should return a single task', (done: DoneFn) => {
    const expectedTask: Task = { id: '1', name: 'Task 1', description: 'Description 1', estimate: 5, state: TaskState.Planned };

    taskServiceSpy.getTask.and.returnValue(of(expectedTask));

    service.getTaskDetails('1').subscribe({
      next: task => {
        expect(task).toEqual(expectedTask);
        done();
      },
      error: done.fail
    });

    expect(taskServiceSpy.getTask.calls.count()).toBe(1);
    expect(taskServiceSpy.getTask.calls.mostRecent().args[0]).toBe('1');
  });

  it('addTask should add a task', (done: DoneFn) => {
    const newTask: Task = { id: '2', name: 'Task 2', description: 'Description 2', estimate: 10, state: TaskState.Planned };

    taskServiceSpy.addTask.and.returnValue(of(newTask));

    service.addTask(newTask).subscribe({
      next: task => {
        expect(task).toEqual(newTask);
        done();
      },
      error: done.fail
    });

    expect(taskServiceSpy.addTask.calls.count()).toBe(1);
  });

  it('updateTask should update the task', (done: DoneFn) => {
    const updatedTask: Task = { id: '1', name: 'Updated Task', description: 'Updated Description', estimate: 15, state: TaskState.Completed };

    taskServiceSpy.updateTask.and.returnValue(of(updatedTask));

    service.updateTask(updatedTask).subscribe({
      next: task => {
        expect(task).toEqual(updatedTask);
        done();
      },
      error: done.fail
    });

    expect(taskServiceSpy.updateTask.calls.count()).toBe(1);
  });
  it('deleteTask should delete the task', (done: DoneFn) => {
    const taskId = '1';
    const mockResponse: Task = { id: taskId, name: 'Mock Task', description: 'Mock Description', estimate: 1, state: TaskState.Completed };

    taskServiceSpy.deleteTask.and.returnValue(of(mockResponse)); // Mocking a Task object as the return value

    service.deleteTask(taskId).subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
        done();
      },
      error: done.fail
    });

    expect(taskServiceSpy.deleteTask.calls.count()).toBe(1);
    expect(taskServiceSpy.deleteTask.calls.mostRecent().args[0]).toBe(taskId);
  });
});
