import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask, TaskStatus } from './tasks.model';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskFilterDTO } from './dto/task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() taskFilterDTO: TaskFilterDTO) {
    return this.taskService.getTaskWithFilter(taskFilterDTO);
  }

  @Post()
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
    @Body('status') status: TaskStatus,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }
}
