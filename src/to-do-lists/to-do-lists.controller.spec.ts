import { Test, TestingModule } from '@nestjs/testing';
import { ToDoListsController } from './to-do-lists.controller';

describe('ToDoListsController', () => {
  let controller: ToDoListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoListsController],
    }).compile();

    controller = module.get<ToDoListsController>(ToDoListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
