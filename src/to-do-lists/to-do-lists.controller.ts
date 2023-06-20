import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ToDoListsService } from './to-do-lists.service';
import { ToDoList as ToDoListModel } from '@prisma/client';
import { Request } from 'express';

@Controller('lists')
export class ToDoListsController {
  constructor(private readonly toDoListsService: ToDoListsService) {}
  @Get()
  async getLists(@Req() req: Request): Promise<ToDoListModel[]> {
    const { sub: userId } = req.user;

    return this.toDoListsService.toDoLists({ where: { authorId: userId } });
  }

  @Get(':id')
  async getListById(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ToDoListModel> {
    const { sub: userId } = req.user;
    return this.toDoListsService.toDoList(userId, { id: id });
  }

  @Post('new')
  async create(
    @Req() req: Request,
    @Body() createToDoListDto: ToDoListModel,
  ): Promise<ToDoListModel> {
    const { sub: userId } = req.user;

    return this.toDoListsService.createToDoList(userId, createToDoListDto);
  }

  @Delete(':id')
  async deletePost(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ToDoListModel> {
    const { sub: userId } = req.user;

    return this.toDoListsService.deleteToDoList(userId, { id });
  }
}
