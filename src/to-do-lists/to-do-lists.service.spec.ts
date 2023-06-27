import { Test, TestingModule } from '@nestjs/testing';
import { ToDoListsService } from './to-do-lists.service';
import { PrismaService } from '../prisma/prisma.service';
import { db } from '../../test/utils/prisma';

describe('ToDoListsService', () => {
  let service: ToDoListsService;

  beforeEach(async () => {
    db.toDoLists = [
      {
        id: '1234',
        authorId: '123',
        title: 'my list',
      },
      {
        id: '5678',
        authorId: '224',
        title: 'my new list',
      },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToDoListsService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<ToDoListsService>(ToDoListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a list', () => {
    const list = {
      title: 'new list',
    };
    const author = { connect: { id: '123' } };
    expect(service.createToDoList({ ...list, author })).resolves.toMatchObject(
      list,
    );
  });
  it('should be able to update a list', () => {
    const authorId = '123';
    const listId = '1234';
    const list = {
      title: 'new title',
    };

    expect(
      service.updateToDoList(authorId, {
        where: { id: listId },
        data: { ...list },
      }),
    ).resolves.toMatchObject(list);
  });
  it("shouldn't be able to update a list if not author", () => {
    const authorId = '125';
    const listId = '1234';
    const list = {
      title: 'new title',
    };

    expect(
      service.updateToDoList(authorId, {
        where: { id: listId },
        data: { ...list },
      }),
    ).rejects.toBeDefined();
  });
  it('should be able to delete a list', () => {
    const userId = '123';
    const listId = '1234';

    expect(
      service.deleteToDoList(userId, {
        id: listId,
      }),
    ).resolves.toMatchObject({ id: '1234' });
  });
  it("shouldn't be able to delete a list if not author", () => {
    const userId = '125';
    const listId = '1234';

    expect(
      service.deleteToDoList(userId, {
        id: listId,
      }),
    ).rejects.toBeDefined();
  });
});
