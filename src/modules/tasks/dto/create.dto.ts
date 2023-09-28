import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    default: TaskStatus.ToDo,
    description: 'The status of the task',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.ToDo;
}
