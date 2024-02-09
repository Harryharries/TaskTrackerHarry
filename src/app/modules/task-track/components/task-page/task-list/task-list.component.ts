import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { TaskCardComponent } from 'app/shared/components/task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks: Task[] | null = [];

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

  trackByTask(index: number, task: Task): string {
    return task.id;
  }
}
