import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    const status = value.toUpperCase();
    if (!this.isStatusValidate(status)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return status;
  }

  private isStatusValidate(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx > -1;
  }
}
