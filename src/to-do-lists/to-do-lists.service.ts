import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToDoList, Prisma } from '@prisma/client';

@Injectable()
export class ToDoListsService {
  constructor(private prisma: PrismaService) {}

  async toDoList(
    userId: string,
    where: Prisma.ToDoListWhereUniqueInput,
  ): Promise<ToDoList | null> {
    const toDoList = await this.prisma.toDoList.findUnique({
      where,
      include: {
        items: true,
      },
    });
    if (!toDoList)
      throw new HttpException("List doesn't exist", HttpStatus.BAD_REQUEST);
    if (toDoList.authorId != userId)
      throw new HttpException(
        "User doesn't own this to do list",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return toDoList;
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
    return await this.prisma.toDoList.create({
      data,
    });
  }

  async updateToDoList(
    userId: string,
    params: {
      where: Prisma.ToDoListWhereUniqueInput;
      data: Prisma.ToDoListUpdateInput;
    },
  ): Promise<ToDoList> {
    const { where, data } = params;

    const toDoList = await this.prisma.toDoList.findUnique({ where });
    if (!toDoList)
      throw new HttpException("List doesn't exist", HttpStatus.BAD_REQUEST);
    if (toDoList.authorId != userId)
      throw new HttpException(
        "User doesn't own this to do list",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return await this.prisma.toDoList.update({
      data,
      where,
    });
  }

  async deleteToDoList(
    userId: string,
    where: Prisma.ToDoListWhereUniqueInput,
  ): Promise<ToDoList> {
    const toDoList = await this.prisma.toDoList.findUnique({ where });
    if (!toDoList)
      throw new HttpException("Item doesn't exist", HttpStatus.BAD_REQUEST);
    if (toDoList.authorId != userId)
      throw new HttpException(
        "User doesn't own this to do item",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return await this.prisma.toDoList.delete({
      where,
    });
  }
}
