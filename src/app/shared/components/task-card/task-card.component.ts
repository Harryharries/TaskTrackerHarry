import { Component, Input } from '@angular/core';
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
}
