import {
  Controller,
  Param,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { TaskFilterDTO } from './dto/task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() taskFilterDTO: TaskFilterDTO) {
    return this.taskService.getTaskWithFilter(taskFilterDTO);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskCreateDto: TaskCreateDto): Promise<Task> {
    return this.taskService.createTask(taskCreateDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }

  /*
  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() taskFilterDTO: TaskFilterDTO) {
    return this.taskService.getTaskWithFilter(taskFilterDTO);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() taskCreateDto: TaskCreateDto): ITask {
    return this.taskService.createTask(taskCreateDto);
  }

  @Get('/:id')
  getTask(@Param('id') id: string): ITask {
    return this.taskService.getTaskByById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }*/
}
