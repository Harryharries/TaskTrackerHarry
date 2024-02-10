import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() stateUpdate = new EventEmitter<Task>();

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
