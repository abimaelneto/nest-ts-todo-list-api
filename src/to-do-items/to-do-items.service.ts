import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToDoItem, Prisma } from '@prisma/client';

@Injectable()
export class ToDoItemsService {
  constructor(private prisma: PrismaService) {}

  async toDoItem(
    userId: string,
    where: Prisma.ToDoItemWhereUniqueInput,
  ): Promise<ToDoItem | null> {
    const toDoItem = await this.prisma.toDoItem.findUnique({ where });
    if (!toDoItem)
      throw new HttpException("Item doesn't exist", HttpStatus.BAD_REQUEST);
    if (toDoItem.authorId != userId)
      throw new HttpException(
        "User doesn't own this to do item",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return toDoItem;
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

  async createToDoItem(
    data: Prisma.ToDoItemCreateInput,
  ): Promise<ToDoItem | undefined> {
    try {
      return await this.prisma.toDoItem.create({
        data,
      });
    } catch (err) {
      if (err.code == 'P2025') {
        throw new HttpException(
          "Provided list doesn't exist",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return;
    }
  }

  async updateToDoItem(
    userId: string,
    params: {
      where: Prisma.ToDoItemWhereUniqueInput;
      data: Prisma.ToDoItemUpdateInput;
    },
  ): Promise<ToDoItem> {
    const { where, data } = params;

    const toDoItem = await this.prisma.toDoItem.findUnique({ where });
    if (!toDoItem)
      throw new HttpException("Item doesn't exist", HttpStatus.BAD_REQUEST);
    if (toDoItem.authorId != userId)
      throw new HttpException(
        "User doesn't own this to do item",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return await this.prisma.toDoItem.update({
      data,
      where,
    });
  }

  async deleteToDoItem(
    userId: string,
    where: Prisma.ToDoItemWhereUniqueInput,
  ): Promise<ToDoItem> {
    const toDoItem = await this.prisma.toDoItem.findUnique({ where });
    if (!toDoItem)
      throw new HttpException("Item doesn't exist", HttpStatus.BAD_REQUEST);
    if (toDoItem.authorId != userId)
      throw new HttpException(
        "User doesn't own this to do item",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return await this.prisma.toDoItem.delete({
      where,
    });
  }
}
