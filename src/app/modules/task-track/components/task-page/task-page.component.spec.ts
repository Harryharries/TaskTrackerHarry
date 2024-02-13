import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskPageComponent } from './task-page.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { CommonModule } from '@angular/common';
import { MockComponent } from 'ng-mocks';
import { ChangeDetectorRef } from '@angular/core';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskPageComponent,
        MockComponent(TaskListComponent),
        MockComponent(TaskDashboardComponent)
      ],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading spinner based on loading input', () => {
    component.loading = true;
    fixture.detectChanges(); // First change detection runs here
    changeDetectorRef.detectChanges(); // Manually trigger change detection again
    let spinner = fixture.debugElement.query(By.css('.loading-overlay'));
    expect(spinner).not.toBeNull();

    component.loading = false;
    fixture.detectChanges(); // Runs change detection after updating the input
    changeDetectorRef.detectChanges(); // Manually trigger change detection again
    spinner = fixture.debugElement.query(By.css('.loading-overlay'));
    expect(spinner).toBeNull();
  });

  it('should display total planned, inProgress, and completed hours', () => {
    // Setup the component inputs
    component.totalPlanned = 5;
    component.totalInProgress = 10;
    component.totalCompleted = 15;

    // Trigger change detection manually to reflect the new input values
    fixture.detectChanges();
    changeDetectorRef.detectChanges();

    // Assert the displayed values
    const totalPlannedElement = fixture.debugElement.query(By.css('div:nth-child(1) .hour-badge .fw-bold'));
    expect(totalPlannedElement.nativeElement.textContent.trim()).toContain('5');

    const totalInProgressElement = fixture.debugElement.query(By.css('div:nth-child(2) .hour-badge .fw-bold'));
    expect(totalInProgressElement.nativeElement.textContent.trim()).toContain('10');

    const totalCompletedElement = fixture.debugElement.query(By.css('div:nth-child(3) .hour-badge .fw-bold'));
    expect(totalCompletedElement.nativeElement.textContent.trim()).toContain('15');
  });

  it('should emit openCreateDialog event when "New Task" button is clicked', () => {
    // Spy on the EventEmitter's emit method
    spyOn(component.openCreateDialog, 'emit');

    // Find the "New Task" button and click it
    const newTaskButton = fixture.debugElement.query(By.css('button.btn-primary')).nativeElement;
    newTaskButton.click();

    // Assert that the event was emitted
    expect(component.openCreateDialog.emit).toHaveBeenCalled();
  });


  it('should emit openCreateDialog event when New Task button is clicked', () => {
    spyOn(component.openCreateDialog, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.openCreateDialog.emit).toHaveBeenCalled();
  });

});
