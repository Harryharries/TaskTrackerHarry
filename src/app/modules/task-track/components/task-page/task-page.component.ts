import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'app/shared/API-proxy/models/task';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';


@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [TaskListComponent, TaskDashboardComponent],
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPageComponent {
  @Input() tasks: Task[] | null = [];
  @Input() loading: boolean | null = false;
  @Input() totalPlanned: number | null = 0;
  @Input() totalInProgress: number | null = 0;
  @Input() totalCompleted: number | null = 0;
  @Output() openCreateDialog = new EventEmitter<void>();
  @Output() emitStateUpdate: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() emitDelete: EventEmitter<Task> = new EventEmitter<Task>();

  createNewTask(): void {
    this.openCreateDialog.emit()
  }
}
