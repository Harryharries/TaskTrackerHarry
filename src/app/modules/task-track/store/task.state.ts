import { HttpErrorResponse } from "@angular/common/http";
import { Task } from "app/shared/API-proxy/models/task";

export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  dialogTaskSuccess: boolean;
}

export const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  dialogTaskSuccess: false
};
