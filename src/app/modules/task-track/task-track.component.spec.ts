import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskTrackComponent } from './task-track.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import if router is used in component
import { Store } from '@ngrx/store';
import * as TaskActions from './store/task.actions';

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

    // Specifically check if the loadTasks action was dispatched
    expect(spy).toHaveBeenCalledWith(jasmine.any(TaskActions.loadTasks().constructor));
  });
  // Add more tests as needed...
});
