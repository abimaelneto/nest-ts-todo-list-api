import { Test, TestingModule } from '@nestjs/testing';
import { ToDoListsService } from './to-do-lists.service';

describe('ToDoListsService', () => {
  let service: ToDoListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDoListsService],
    }).compile();

    service = module.get<ToDoListsService>(ToDoListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
