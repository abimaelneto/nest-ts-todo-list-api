import { Prisma, ToDoList } from '@prisma/client';
import { whereFn } from '../where';

export class db {
  static toDoList = {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest
      .fn()
      .mockImplementation(({ where }: Prisma.ToDoListFindUniqueArgs) => {
        return this.toDoLists.find((l) => {
          for (const k in where) {
            if (where[k] == l[k]) return l;
          }
          return;
        });
      }),
    update: jest
      .fn()
      .mockImplementation(({ where, data }: Prisma.ToDoListUpdateArgs) => {
        const list = this.toDoLists.find(whereFn(where));
        if (!list) throw new Error('not found');
        return { ...list, ...data };
      }),
    create: jest
      .fn()
      .mockImplementation(({ data }: { data: Prisma.ToDoListCreateInput }) => {
        const { author, ...rest } = data;
        return { ...rest, id: '1' } as ToDoList;
      }),
    delete: jest
      .fn()
      .mockImplementation(({ where }: Prisma.ToDoListDeleteArgs) => {
        const listIndex = this.toDoLists.findIndex(whereFn(where));
        if (typeof listIndex == 'undefined') throw new Error('not found');

        const list = this.toDoLists[listIndex];
        this.toDoLists = [
          ...this.toDoLists.slice(0, listIndex),
          ...this.toDoLists.slice(listIndex + 1, this.toDoLists.length),
        ];
        return list;
      }),
  };
  static toDoLists: ToDoList[] = [];
}
