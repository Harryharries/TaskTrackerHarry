import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTooltipModule,
        NoopAnimationsModule,
        TaskCardComponent // Import the standalone component here
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    // Mock task input
    component.task = {
      id: '1',
      name: 'Test Task',
      description: 'Test Description',
      estimate: 5,
      state: TaskState.Planned
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit state update when emitStateUpdate is called', () => {
    spyOn(component.stateUpdate, 'emit');
    const newState = TaskState.Completed;
    component.emitStateUpdate(newState);
    expect(component.stateUpdate.emit).toHaveBeenCalledWith({
      ...component.task,
      state: newState
    });
  });

  it('should emit delete task event when delete button is clicked', () => {
    spyOn(component.deleteTask, 'emit');
    component.deleteTask.emit(component.task); // Simulate clicking the delete button
    expect(component.deleteTask.emit).toHaveBeenCalledWith(component.task);
  });
});
