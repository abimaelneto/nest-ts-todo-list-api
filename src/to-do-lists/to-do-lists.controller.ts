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
import { ToDoListsService } from './to-do-lists.service';
import { Prisma, ToDoList as ToDoListModel } from '@prisma/client';
import { Request } from 'express';

@Controller('lists')
export class ToDoListsController {
  constructor(private readonly toDoListsService: ToDoListsService) {}
  @Get()
  async getLists(@Req() req: Request): Promise<ToDoListModel[]> {
    const userId = req?.user?.sub;
    if (!userId)
      throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
    return this.toDoListsService.toDoLists({ where: { authorId: userId } });
  }

  @Get(':id')
  async getListById(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ToDoListModel | null> {
    const userId = req?.user?.sub;
    if (!userId)
      throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
    return this.toDoListsService.toDoList(userId, { id: id });
  }

  @Post('new')
  async create(
    @Req() req: Request,
    @Body() toDoListData: { title: string },
  ): Promise<ToDoListModel> {
    const { sub: userId } = req.user || {};
    const { title } = toDoListData;
    return this.toDoListsService.createToDoList({
      title,
      author: { connect: { id: userId } },
    });
  }

  @Patch(':id')
  async updateList(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() toDoListData: { title: string },
  ): Promise<ToDoListModel> {
    const userId = req?.user?.sub;
    if (!userId)
      throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
    return this.toDoListsService.updateToDoList(userId, {
      where: { id },
      data: toDoListData,
    });
  }
  @Delete(':id')
  async deletePost(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ToDoListModel> {
    const userId = req?.user?.sub;
    if (!userId)
      throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
    return this.toDoListsService.deleteToDoList(userId, { id });
  }
}
