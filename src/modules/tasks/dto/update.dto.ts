// src/modules/tasks/dto/update-task.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
