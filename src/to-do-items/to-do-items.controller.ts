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
  Req,
} from '@nestjs/common';
import { ToDoItemsService } from './to-do-items.service';
import { ToDoList as ToDoItemModel } from '@prisma/client';
import { Request } from 'express';

@Controller('items')
export class ToDoItemsController {
  constructor(private readonly toDoItemsService: ToDoItemsService) {}
  @Get()
  async getItems(@Req() req: Request): Promise<ToDoItemModel[]> {
    const { sub: userId } = req.user;
    return this.toDoItemsService.toDoItems({ where: { authorId: userId } });
  }

  @Get(':id')
  async getItem(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ToDoItemModel> {
    const { sub: userId } = req.user;

    return this.toDoItemsService.toDoItem(userId, { id });
  }

  @Post('new')
  async createToDoItem(
    @Req() req: Request,
    @Body() toDoItemData: { title: string; deadline: string; listId: string },
  ): Promise<ToDoItemModel> {
    const { sub: userId } = req.user;
    const { title, deadline, listId } = toDoItemData;

    if (!listId)
      throw new HttpException('Missing list id', HttpStatus.BAD_REQUEST);

    return await this.toDoItemsService.createToDoItem({
      title,
      deadline,
      list: { connect: { id: listId } },
      author: { connect: { id: userId } },
    });
  }

  @Delete(':id')
  async deleteToDoItem(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ToDoItemModel> {
    const { sub: userId } = req.user;

    return this.toDoItemsService.deleteToDoItem(userId, { id });
  }

  @Patch(':id')
  async update(
    @Req() req: Request,

    @Param('id') id: string,
    @Body() toDoItemData: { deadline: string; listId: string; done: boolean },
  ): Promise<ToDoItemModel> {
    const { sub: userId } = req.user;

    return this.toDoItemsService.updateToDoItem(userId, {
      where: { id },
      data: toDoItemData,
    });
  }
}
