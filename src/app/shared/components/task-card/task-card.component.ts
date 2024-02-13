import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() dashboard: boolean = false;
  @Output() stateUpdate = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  emitStateUpdate(newState: TaskState): void {
    const updatedTask = {
      ...this.task,
      state: newState
    }
    this.stateUpdate.emit(updatedTask);
  }

  get availableStates(): TaskState[] {
    const test = Object.values(TaskState)
    return test.filter(state => state !== this.task.state);
  }
}
