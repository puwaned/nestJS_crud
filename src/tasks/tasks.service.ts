import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskFilterDTO } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTaskWithFilter(taskFilterDTO: TaskFilterDTO): ITask[] {
    const { search, status } = taskFilterDTO;
    let tasks: ITask[] = this.getTasks();
    if (search && status) {
    } else if (search) {
      tasks = this.tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    } else if (status) {
      tasks = this.tasks.filter(task => task.status == status);
    }

    return tasks;
  }

  createTask(taskCreateDTO: TaskCreateDto): ITask {
    const { title, description } = taskCreateDTO;
    const task = {
      id: uuidv4(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskByById(id: string): ITask {
    return this.tasks.find(task => task.id === id);
  }

  deleteTask(id: string): void {
    this.tasks.filter(task => task.id != id);
  }

  updateTaskStatus(id: string, status: TaskStatus): ITask {
    const task: ITask = this.getTaskByById(id);
    task.status = status;
    return task;
  }
}
