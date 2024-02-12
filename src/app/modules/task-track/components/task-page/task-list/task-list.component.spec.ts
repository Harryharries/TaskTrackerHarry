import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskListComponent } from './task-list.component';
import { MockComponent } from 'ng-mocks';
import { TaskCardComponent } from 'app/shared/components/task-card/task-card.component';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTasks: Task[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskListComponent,
        MockComponent(TaskCardComponent)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    mockTasks = [
      { id: '1', name: 'Task 1', description: 'Desc 1', estimate: 5, state: TaskState.Planned },
      { id: '2', name: 'Task 2', description: 'Desc 2', estimate: 3, state: TaskState.InProgress },
      { id: '3', name: 'Task 3', description: 'Desc 3', estimate: 8, state: TaskState.Completed }
    ];
    component.tasks = mockTasks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with "All" tasks filter', () => {
    expect(component.currentFilter).toBe('All');
  });

  it('should filter tasks correctly', () => {
    component.setFilter(TaskState.Planned);
    expect(component.filterTasks(component.tasks).length).toBe(1);
    component.setFilter(TaskState.InProgress);
    expect(component.filterTasks(component.tasks).length).toBe(1);
    component.setFilter(TaskState.Completed);
    expect(component.filterTasks(component.tasks).length).toBe(1);
    component.setFilter('All');
    expect(component.filterTasks(component.tasks).length).toBe(3);
  });

  it('should update filter on button click', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.currentFilter).toBe(TaskState.Planned);
    buttons[2].nativeElement.click();
    fixture.detectChanges();
    expect(component.currentFilter).toBe(TaskState.InProgress);
  });

  it('should emit deleteTask event', () => {
    spyOn(component.emitDelete, 'emit');
    component.emitDelete.emit(mockTasks[0]);
    expect(component.emitDelete.emit).toHaveBeenCalledWith(mockTasks[0]);
  });

});
