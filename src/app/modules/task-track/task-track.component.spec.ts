import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskTrackComponent } from './task-track.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import if router is used in component
import { Store } from '@ngrx/store';
import * as TaskActions from './store/task.actions';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';

describe('TaskTrackComponent', () => {
  let component: TaskTrackComponent;
  let fixture: ComponentFixture<TaskTrackComponent>;
  const initialState = { taskState: { tasks: [], loading: false, error: null } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskTrackComponent,
        RouterTestingModule
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks action on init', () => {
    const store = TestBed.inject(Store);
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(jasmine.any(TaskActions.loadTasks().constructor));
  });

  it('should dispatch loadTaskDetails action for a given id', () => {
    const store = TestBed.inject(Store);
    const spy = spyOn(store, 'dispatch');
    const testId = '123';
    component.loadTaskDetails(testId);
    expect(spy).toHaveBeenCalledWith(TaskActions.loadTaskDetails({ id: testId }));
  });

  it('should dispatch addTask action for a given task', () => {
    const store = TestBed.inject(Store);
    const spy = spyOn(store, 'dispatch');
    const testTask: Task = {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      estimate: 5,
      state: TaskState.Planned,
    };
    component.addTask(testTask);
    expect(spy).toHaveBeenCalledWith(TaskActions.addTask({ task: testTask }));
  });

  it('should dispatch updateTask action for a given task', () => {
    const store = TestBed.inject(Store);
    const spy = spyOn(store, 'dispatch');
    const testTask: Task = {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      estimate: 5,
      state: TaskState.Planned,
    };
    component.updateTask(testTask);
    expect(spy).toHaveBeenCalledWith(TaskActions.updateTask({ task: testTask }));
  });

  it('should dispatch deleteTask action for a given id', () => {
    const store = TestBed.inject(Store);
    const spy = spyOn(store, 'dispatch');
    const testId = '123';
    component.deleteTask(testId);
    expect(spy).toHaveBeenCalledWith(TaskActions.deleteTask({ id: testId }));
  });

});
