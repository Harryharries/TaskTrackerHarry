import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task, TaskState } from 'app/shared/API-proxy/models/task';

export class InMemoryTaskDBService implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [
      { id: '1', name: 'Task 1', description: 'Task 1 Description', estimate: 2, state: TaskState.Planned },
      { id: '2', name: 'Task 2', description: 'Task 2 Description', estimate: 4, state: TaskState.InProgress },
      { id: '3', name: 'Task 3', description: 'Task 3 Description', estimate: 5, state: TaskState.Completed },
    ];
    return { tasks };
  }
}
