
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { TaskCardComponent } from 'app/shared/components/task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  @Input() tasks: Task[] | null = [];
  @Output() emitStateUpdate: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() emitDelete: EventEmitter<Task> = new EventEmitter<Task>();

  currentFilter: TaskState | 'All' = 'All';
  TaskState = TaskState;

  constructor() { }

  setFilter(filter: TaskState | 'All') {
    this.currentFilter = filter;
  }

  filterTasks(tasks: Task[] | null): Task[] {
    if (!tasks) return [];
    if (this.currentFilter === 'All') return tasks;
    return tasks.filter(task => task.state === this.currentFilter);
  }
}
