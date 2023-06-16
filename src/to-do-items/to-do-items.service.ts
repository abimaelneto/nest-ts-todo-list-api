import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ToDoItem, Prisma } from '@prisma/client';

@Injectable()
export class ToDoItemsService {
  constructor(private prisma: PrismaService) {}

  async toDoItem(
    ToDoItemWhereUniqueInput: Prisma.ToDoItemWhereUniqueInput,
  ): Promise<ToDoItem | null> {
    return this.prisma.toDoItem.findUnique({
      where: ToDoItemWhereUniqueInput,
    });
  }

  async toDoItems(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ToDoItemWhereUniqueInput;
    where?: Prisma.ToDoItemWhereInput;
    orderBy?: Prisma.ToDoItemOrderByWithRelationInput;
  }): Promise<ToDoItem[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.toDoItem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createToDoItem(data: Prisma.ToDoItemCreateInput): Promise<ToDoItem> {
    return this.prisma.toDoItem.create({
      data,
    });
  }

  async updateToDoItem(params: {
    where: Prisma.ToDoItemWhereUniqueInput;
    data: Prisma.ToDoItemUpdateInput;
  }): Promise<ToDoItem> {
    const { where, data } = params;
    return this.prisma.toDoItem.update({
      data,
      where,
    });
  }

  async deleteToDoItem(
    where: Prisma.ToDoItemWhereUniqueInput,
  ): Promise<ToDoItem> {
    return this.prisma.toDoItem.delete({
      where,
    });
  }
}
