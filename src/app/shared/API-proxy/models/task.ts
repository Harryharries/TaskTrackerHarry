export interface Task {
  id: string;
  name: string;
  description: string;
  estimate: number;
  state: TaskState;
}

export enum TaskState {
  Planned = 'Planned',
  InProgress = 'In Progress',
  Completed = 'Completed'
}
