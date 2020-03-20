import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskCreateDto } from './dto/task-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { TaskFilterDTO } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task ID ${id} NotFound.`);
    }
    return found;
  }

  async createTask(taskCreateDTO: TaskCreateDto): Promise<Task> {
    return this.taskRepository.createTask(taskCreateDTO);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task ID ${id} NotFound.`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    try {
      await task.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return task;
  }

  async getTaskWithFilter(taskFilterDTO: TaskFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTaskWithFilter(taskFilterDTO);
  }
}
