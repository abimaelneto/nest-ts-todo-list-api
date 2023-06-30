import { Test, TestingModule } from '@nestjs/testing';
import { ToDoItemsController } from './to-do-items.controller';
import { PrismaService } from '../prisma/prisma.service';
import { db } from '../../test/utils/prisma';
import { ToDoItemsService } from './to-do-items.service';

describe('ToDoItemsController', () => {
  let controller: ToDoItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoItemsController],
      providers: [ToDoItemsService, { provide: PrismaService, useValue: db }],
    }).compile();

    controller = module.get<ToDoItemsController>(ToDoItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
