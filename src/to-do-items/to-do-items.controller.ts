import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ToDoItemsService } from './to-do-items.service';
import { Prisma, ToDoList as ToDoItemModel } from '@prisma/client';

@Controller('items')
export class ToDoItemsController {
  constructor(private readonly toDoItemsService: ToDoItemsService) {}
  @Get()
  async getItems(): Promise<ToDoItemModel[]> {
    return this.toDoItemsService.toDoItems({});
  }

  @Get(':id')
  async getItem(@Param('id') id: string): Promise<ToDoItemModel> {
    return this.toDoItemsService.toDoItem({ id: id });
  }

  @Post('new')
  async createToDoItem(
    @Body() toDoItemData: { title: string; deadline: string; listId: string },
  ): Promise<ToDoItemModel> {
    const { title, deadline, listId } = toDoItemData;

    if (!listId)
      throw new HttpException('Missing list id', HttpStatus.BAD_REQUEST);

    return this.toDoItemsService.createToDoItem({
      title,
      deadline,
      list: { connect: { id: listId } },
    });
  }

  @Delete(':id')
  async deleteToDoItem(@Param('id') id: string): Promise<ToDoItemModel> {
    return this.toDoItemsService.deleteToDoItem({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() toDoItemData: { deadline: string; listId: string; done: boolean },
  ): Promise<ToDoItemModel> {
    return this.toDoItemsService.updateToDoItem({
      where: { id },
      data: toDoItemData,
    });
  }
}
