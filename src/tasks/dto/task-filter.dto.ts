import { TaskStatus } from '../tasks.model';

export class TaskFilterDTO {
  status: TaskStatus;
  search: string;
}
