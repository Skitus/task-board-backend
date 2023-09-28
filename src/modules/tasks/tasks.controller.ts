import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.dto';
import { Task } from '../../entities/task.entity';
import { UpdateTaskDto } from './dto/update.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/update')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Task[]> {
    return this.tasksService.findAll(page, limit);
  }
}
