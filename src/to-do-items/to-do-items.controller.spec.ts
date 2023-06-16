import { Test, TestingModule } from '@nestjs/testing';
import { ToDoItemsController } from './to-do-items.controller';

describe('ToDoItemsController', () => {
  let controller: ToDoItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoItemsController],
    }).compile();

    controller = module.get<ToDoItemsController>(ToDoItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
