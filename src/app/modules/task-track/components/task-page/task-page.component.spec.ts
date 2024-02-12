import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskPageComponent } from './task-page.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { CommonModule } from '@angular/common';
import { MockComponent } from 'ng-mocks';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskPageComponent,
        // Use MockComponent to mock child components
        MockComponent(TaskListComponent),
        MockComponent(TaskDashboardComponent)
      ],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading spinner based on loading input', () => {
    component.loading = true;
    fixture.detectChanges();
    let spinner = fixture.debugElement.query(By.css('.loading-overlay'));
    expect(spinner).not.toBeNull();

    component.loading = false;
    fixture.detectChanges();
    spinner = fixture.debugElement.query(By.css('.loading-overlay'));
    expect(spinner).toBeNull();
  });

  it('should emit openCreateDialog event when New Task button is clicked', () => {
    spyOn(component.openCreateDialog, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.openCreateDialog.emit).toHaveBeenCalled();
  });

});
