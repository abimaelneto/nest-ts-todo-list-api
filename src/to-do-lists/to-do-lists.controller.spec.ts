import { Test, TestingModule } from '@nestjs/testing';
import { ToDoListsController } from './to-do-lists.controller';
import { ToDoListsService } from './to-do-lists.service';
import { PrismaService } from '../prisma/prisma.service';
import { db } from '../../test/utils/prisma/to-do-lists';

describe('ToDoListsController', () => {
  let controller: ToDoListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoListsController],
      providers: [
        ToDoListsService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    controller = module.get<ToDoListsController>(ToDoListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('List - GET 200', () => {
    controller.create({ title: 'new list' });
  });
});
