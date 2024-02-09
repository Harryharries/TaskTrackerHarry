import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from 'app/shared/API-proxy/models/task';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent {
  @Input() tasks: Task[] | null = [];
}
