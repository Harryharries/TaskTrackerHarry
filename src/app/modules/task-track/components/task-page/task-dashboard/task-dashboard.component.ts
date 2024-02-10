import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';
import { TaskCardComponent } from 'app/shared/components/task-card/task-card.component';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent {
  @Input() tasks: Task[] | null= [];
  TaskState = TaskState;

  getTasksByState(state: TaskState): Task[] {
    return this.tasks?.filter(task => task.state === state) || [];
  }
}
