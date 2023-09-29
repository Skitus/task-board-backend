import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from '../../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create.dto';
import { UpdateTaskDto } from './dto/update.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, status } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.status = status || TaskStatus.ToDo;

    return this.tasksRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const { title, status } = updateTaskDto;

    if (title !== undefined) {
      task.title = title;
    }

    if (status !== undefined) {
      task.status = status;
    }

    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.tasksRepository.remove(task);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();

    const sortedTasks = tasks.sort((a, b) => {
      const order = ['In Progress', 'To Do', 'Completed'];
      const statusOrder = order.indexOf(a.status) - order.indexOf(b.status);
      if (statusOrder !== 0) return statusOrder;

      return a.title.localeCompare(b.title);
    });

    return sortedTasks;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }
}
