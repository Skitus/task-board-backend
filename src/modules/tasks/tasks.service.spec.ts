import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskStatus } from '../../entities/task.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let mockTasksRepository: Repository<Task>;

  beforeEach(async () => {
    mockTasksRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
      find: jest.fn(),
    } as unknown as Repository<Task>;

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

  describe('remove', () => {
    it('should remove a task', async () => {
      const taskId = 'some-task-id';

      (mockTasksRepository.findOne as jest.Mock).mockResolvedValue({
        id: taskId,
      });

      await service.remove(taskId);

      expect(mockTasksRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskId },
      });
      expect(mockTasksRepository.remove).toHaveBeenCalledWith({
        id: taskId,
      });
    });

    it('should throw NotFoundException when task not found', async () => {
      const taskId = 'some-task-id';

      (mockTasksRepository.findOne as jest.Mock).mockResolvedValue(undefined);

      await expect(service.remove(taskId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return a list of tasks sorted by status and title', async () => {
      const tasks: Task[] = [
        {
          id: 'id1',
          title: 'B Task',
          status: TaskStatus.ToDo,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'id2',
          title: 'A Task',
          status: TaskStatus.InProgress,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (mockTasksRepository.find as jest.Mock).mockResolvedValue(tasks);

      const result = await service.findAll();

      expect(result).toEqual(tasks);
      expect(mockTasksRepository.find).toHaveBeenCalled();
    });

    it('should return an empty array if there are no tasks', async () => {
      (mockTasksRepository.find as jest.Mock).mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockTasksRepository.find).toHaveBeenCalled();
    });
  });
});
