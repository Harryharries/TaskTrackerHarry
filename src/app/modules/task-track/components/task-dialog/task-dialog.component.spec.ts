import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TaskDialogComponent } from './task-dialog.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let store: MockStore;
  const initialState = { taskState: { tasks: [], loading: false, error: null } };
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        TaskDialogComponent
      ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState }),
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the task form with default values', () => {
    const taskForm = component.taskForm;
    expect(taskForm).toBeTruthy();
    expect(taskForm.get('name')?.value).toEqual('');
    expect(taskForm.get('description')?.value).toEqual('');
    expect(taskForm.get('estimate')?.value).toEqual(1);
  });

  it('should validate the task form fields as required', () => {
    const taskForm = component.taskForm;
    let nameField = taskForm.get('name');
    let estimateField = taskForm.get('estimate');

    nameField?.setValue('');
    estimateField?.setValue('');

    expect(nameField?.valid).toBeFalsy();
    expect(estimateField?.valid).toBeFalsy();
    expect(taskForm.valid).toBeFalsy();

    nameField?.setValue('Test Task');
    estimateField?.setValue(2);

    expect(nameField?.valid).toBeTruthy();
    expect(estimateField?.valid).toBeTruthy();
    expect(taskForm.valid).toBeTruthy();
  });

  it('should dispatch an "addTask" action when create method is called with valid form', () => {
    spyOn(store, 'dispatch').and.callThrough();

    component.taskForm.controls['name'].setValue('Test Task');
    component.taskForm.controls['estimate'].setValue(2);
    component.create();

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.anything());
  });


  it('should close the dialog when close method is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

});
