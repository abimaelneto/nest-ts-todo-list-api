import { Test, TestingModule } from '@nestjs/testing';
import { ToDoItemsService } from './to-do-items.service';
import { PrismaService } from '../prisma/prisma.service';
import { db } from '../../test/utils/prisma';

describe('ToDoItemsService', () => {
  let service: ToDoItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDoItemsService, { provide: PrismaService, useValue: db }],
    }).compile();

    service = module.get<ToDoItemsService>(ToDoItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
