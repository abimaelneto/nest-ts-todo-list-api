import { Prisma, ToDoList, User } from '@prisma/client';
import { whereFn } from '../where';

export class db {
  static toDoList = {
    findMany: jest.fn().mockImplementation(() => this.toDoLists),
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
        const { connect } = author;
        const authorId = connect?.id;
        if (!authorId) throw new Error('missing author');
        const newRecord = {
          ...rest,
          authorId,
          id: (this.toDoLists.length + 1).toString(),
        };
        this.toDoLists.push(newRecord);
        return newRecord as ToDoList;
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
  static user = {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest
      .fn()
      .mockImplementation(({ where }: Prisma.UserFindUniqueArgs) => {
        return this.users.find((l) => {
          for (const k in where) {
            if (where[k] == l[k]) return l;
          }
          return;
        });
      }),
    update: jest
      .fn()
      .mockImplementation(({ where, data }: Prisma.UserUpdateArgs) => {
        const user = this.users.find(whereFn(where));
        if (!user) throw new Error('not found');
        return { ...user, ...data };
      }),
    create: jest
      .fn()
      .mockImplementation(({ data }: { data: Prisma.UserCreateInput }) => {
        const newRecord = { ...data, id: (this.users.length + 1).toString() };
        this.users.push(newRecord);
        return newRecord as User;
      }),
    delete: jest.fn().mockImplementation(({ where }: Prisma.UserDeleteArgs) => {
      const userIndex = this.users.findIndex(whereFn(where));
      if (typeof userIndex == 'undefined') throw new Error('not found');

      const user = this.users[userIndex];
      this.users = [
        ...this.users.slice(0, userIndex),
        ...this.users.slice(userIndex + 1, this.users.length),
      ];
      return user;
    }),
  };
  static toDoLists: ToDoList[] = [];
  static users: User[] = [];

  static reset() {
    this.users = [];
    this.toDoLists = [];
  }
}
