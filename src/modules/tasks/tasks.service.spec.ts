import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskStatus } from '../../entities/task.entity';
import { CreateTaskDto } from './dto/create.dto';
import { UpdateTaskDto } from './dto/update.dto';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let mockTasksRepository: Partial<Repository<Task>>;

  beforeEach(async () => {
    mockTasksRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  describe('create', () => {
    it('should create a task and return it', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        status: TaskStatus.ToDo,
      };
      const task = new Task();
      task.title = createTaskDto.title;
      task.status = TaskStatus.ToDo;

      (mockTasksRepository.save as jest.Mock).mockResolvedValue(task);

      const result = await service.create(createTaskDto);

      expect(result).toEqual(task);
      expect(mockTasksRepository.save).toHaveBeenCalled();
      expect(result.title).toEqual(createTaskDto.title);
      expect(result.status).toEqual(TaskStatus.ToDo);
    });
  });

  describe('update', () => {
    it('should update a task and return it', async () => {
      const id = 'some-id';
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        status: TaskStatus.Completed,
      };
      const task = new Task();
      task.id = id;
      task.title = 'Original Task';
      task.status = TaskStatus.ToDo;

      (mockTasksRepository.findOne as jest.Mock).mockResolvedValue(task);
      (mockTasksRepository.save as jest.Mock).mockResolvedValue({
        ...task,
        ...updateTaskDto,
      });

      const result = await service.update(id, updateTaskDto);

      expect(result).toEqual({ ...task, ...updateTaskDto });
      expect(mockTasksRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockTasksRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if task is not found', async () => {
      const id = 'some-id';
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        status: TaskStatus.Completed,
      };

      (mockTasksRepository.findOne as jest.Mock).mockResolvedValue(undefined);

      await expect(service.update(id, updateTaskDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task and return void', async () => {
      const taskId = 'some-task-id';
      const task = new Task();
      task.id = taskId;
      task.title = 'Test Task';
      task.status = TaskStatus.ToDo;

      (mockTasksRepository.findOne as jest.Mock).mockResolvedValue(task);

      await service.remove(taskId);

      expect(mockTasksRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskId },
      });
      expect(mockTasksRepository.remove).toHaveBeenCalledWith(task);
    });

    it('should throw NotFoundException when task not found', async () => {
      const taskId = 'some-task-id';

      (mockTasksRepository.findOne as jest.Mock).mockResolvedValue(undefined);

      await expect(service.remove(taskId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of tasks sorted by status and title', async () => {
      const page = 1;
      const limit = 10;

      const tasks: Task[] = [
        {
          id: 'id1',
          title: 'A Task',
          status: TaskStatus.InProgress,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'id2',
          title: 'B Task',
          status: TaskStatus.ToDo,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'id3',
          title: 'C Task',
          status: TaskStatus.Completed,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Mocking the tasksRepository.find method
      (mockTasksRepository.find as jest.Mock).mockResolvedValue(tasks);

      const result = await service.findAll(page, limit);

      expect(result).toEqual(tasks.slice(0, limit));
      expect(mockTasksRepository.find).toHaveBeenCalled();
    });

    it('should return an empty array if there are no tasks', async () => {
      const page = 1;
      const limit = 10;

      // Mocking the tasksRepository.find method to return an empty array
      (mockTasksRepository.find as jest.Mock).mockResolvedValue([]);

      const result = await service.findAll(page, limit);

      expect(result).toEqual([]);
      expect(mockTasksRepository.find).toHaveBeenCalled();
    });
  });
});
