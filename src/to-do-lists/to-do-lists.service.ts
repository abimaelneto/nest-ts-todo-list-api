import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ToDoList, Prisma } from '@prisma/client';

@Injectable()
export class ToDoListsService {
  constructor(private prisma: PrismaService) {}

  async toDoList(
    ToDoListWhereUniqueInput: Prisma.ToDoListWhereUniqueInput,
  ): Promise<ToDoList | null> {
    return this.prisma.toDoList.findUnique({
      where: ToDoListWhereUniqueInput,
      include: {
        items: true,
      },
    });
  }

  async toDoLists(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ToDoListWhereUniqueInput;
    where?: Prisma.ToDoListWhereInput;
    orderBy?: Prisma.ToDoListOrderByWithRelationInput;
  }): Promise<ToDoList[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.toDoList.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createToDoList(data: Prisma.ToDoListCreateInput): Promise<ToDoList> {
    return this.prisma.toDoList.create({
      data,
    });
  }

  async updateToDoList(params: {
    where: Prisma.ToDoListWhereUniqueInput;
    data: Prisma.ToDoListUpdateInput;
  }): Promise<ToDoList> {
    const { where, data } = params;
    return this.prisma.toDoList.update({
      data,
      where,
    });
  }

  async deleteToDoList(
    where: Prisma.ToDoListWhereUniqueInput,
  ): Promise<ToDoList> {
    return this.prisma.toDoList.delete({
      where,
    });
  }
}
