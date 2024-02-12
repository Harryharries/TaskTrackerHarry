import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDashboardComponent } from './task-dashboard.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MockComponent } from 'ng-mocks';
import { TaskCardComponent } from 'app/shared/components/task-card/task-card.component';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';

describe('TaskDashboardComponent', () => {
  let component: TaskDashboardComponent;
  let fixture: ComponentFixture<TaskDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDashboardComponent, MockComponent(TaskCardComponent)],
      imports: [DragDropModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDashboardComponent);
    component = fixture.componentInstance;
    component.tasks = [
      { id: '1', name: 'Task 1', description: 'Description 1', estimate: 5, state: TaskState.Planned },
      { id: '2', name: 'Task 2', description: 'Description 2', estimate: 3, state: TaskState.InProgress },
      { id: '3', name: 'Task 3', description: 'Description 3', estimate: 8, state: TaskState.Completed }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter tasks by state', () => {
    const plannedTasks = component.getTasksByState(TaskState.Planned);
    expect(plannedTasks.length).toBe(1);
    expect(plannedTasks[0].id).toBe('1');

    const inProgressTasks = component.getTasksByState(TaskState.InProgress);
    expect(inProgressTasks.length).toBe(1);
    expect(inProgressTasks[0].id).toBe('2');

    const completedTasks = component.getTasksByState(TaskState.Completed);
    expect(completedTasks.length).toBe(1);
    expect(completedTasks[0].id).toBe('3');
  });

  it('should emit taskStateChange event on task drop', () => {
    spyOn(component.taskStateChange, 'emit');
    const event = {
      previousContainer: {
        data: component.tasks
      },
      container: {
        id: 'completedTasks'
      },
      previousIndex: 0,
      currentIndex: 0
    } as unknown as CdkDragDrop<Task[]>;
    component.drop(event);
    expect(component.taskStateChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({ id: '1', state: TaskState.Completed }));
  });

  it('should emit taskDelete event on task delete', () => {
    spyOn(component.taskDelete, 'emit');
    const event = {
      previousContainer: {
        data: component.tasks
      },
      container: {
        id: 'deleteArea'
      },
      previousIndex: 0,
      currentIndex: 0
    } as unknown as CdkDragDrop<Task[]>;
    component.deleteTask(event);
    expect(component.taskDelete.emit).toHaveBeenCalledWith(jasmine.objectContaining({ id: '1' }));
  });
});
