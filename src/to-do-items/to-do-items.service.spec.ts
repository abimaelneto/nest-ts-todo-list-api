import { Test, TestingModule } from '@nestjs/testing';
import { ToDoItemsService } from './to-do-items.service';

describe('ToDoItemsService', () => {
  let service: ToDoItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDoItemsService],
    }).compile();

    service = module.get<ToDoItemsService>(ToDoItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
