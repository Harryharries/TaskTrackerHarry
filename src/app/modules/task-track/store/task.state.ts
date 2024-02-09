import { Task } from "app/shared/API-proxy/models/task";

export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null
};
