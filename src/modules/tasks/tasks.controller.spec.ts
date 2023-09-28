import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskStatus } from '../../entities/task.entity';

const mockTasksService = {
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findAll: jest.fn(),
};

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  describe('create', () => {
    it('should call tasksService.create with correct parameters and return the result', async () => {
      const createTaskDto = {
        title: 'Test Task',
        status: TaskStatus.ToDo,
      };
      const resultTask = {
        id: 'qwe-qweqwe-qwe-qwe-qwe',
        ...createTaskDto,
      };

      mockTasksService.create.mockResolvedValue(resultTask);

      const result = await controller.create(createTaskDto);

      expect(result).toEqual(resultTask);
      expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('update', () => {
    it('should call tasksService.update with correct parameters and return the result', async () => {
      const id = 'qwe-qweqwe-qwe-qwe-qwe';
      const updateTaskDto = {
        title: 'Updated Task',
        status: TaskStatus.Completed,
      };
      const resultTask = {
        id,
        ...updateTaskDto,
      };

      mockTasksService.update.mockResolvedValue(resultTask);

      const result = await controller.update(id, updateTaskDto);

      expect(result).toEqual(resultTask);
      expect(mockTasksService.update).toHaveBeenCalledWith(id, updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should call tasksService.remove with correct parameters', async () => {
      const id = 'qwe-qweqwe-qwe-qwe-qwe';

      await controller.remove(id);

      expect(mockTasksService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should call tasksService.findAll with correct parameters and return the result', async () => {
      const page = 1;
      const limit = 10;
      const mockTasks = [
        {
          id: 'id1',
          title: 'Test Task 1',
          status: TaskStatus.ToDo,
        },
        {
          id: 'id2',
          title: 'Test Task 2',
          status: TaskStatus.InProgress,
        },
      ];

      mockTasksService.findAll.mockResolvedValue(mockTasks);

      const result = await controller.findAll(page, limit);

      expect(result).toEqual(mockTasks);
      expect(mockTasksService.findAll).toHaveBeenCalledWith(page, limit);
    });
  });
});
