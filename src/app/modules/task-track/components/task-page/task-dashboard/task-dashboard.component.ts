import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { TaskCardComponent } from 'app/shared/components/task-card/task-card.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, TaskCardComponent,DragDropModule],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent {
  @Input() tasks: Task[] | null = [];
  @Output() taskStateChange = new EventEmitter<Task>();
  TaskState = TaskState;

  getTasksByState(state: TaskState): Task[] {
    return this.tasks?.filter(task => task.state === state) || [];
  }

  determineStateFromContainer(containerId: string): TaskState {
    switch(containerId) {
      case 'plannedTasks': return TaskState.Planned;
      case 'inProgressTasks': return TaskState.InProgress;
      case 'completedTasks': return TaskState.Completed;
      default:
        return TaskState.Planned
    }
  }
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer !== event.container) {
      let task = event.previousContainer.data[event.previousIndex];
      const newState = this.determineStateFromContainer(event.container.id);
      const updatedTask = {
        ...task,
        state: newState
      };
      this.taskStateChange.emit(updatedTask);
    }
  }
}
