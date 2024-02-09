import { Component, OnInit } from '@angular/core';
import { Task } from 'app/shared/API-proxy/models/task';
import { Observable } from 'rxjs';
import { TaskTrackService } from './services/task-track.service';

@Component({
  selector: 'app-task-track',
  standalone: true,
  imports: [],
  templateUrl: './task-track.component.html',
  styleUrl: './task-track.component.scss'
})
export class TaskTrackComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined;

  constructor(private taskTrackService: TaskTrackService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskTrackService.getTasks();
    this.tasks$.subscribe((tasks)=>{
      console.log(tasks);
    })
  }
}
