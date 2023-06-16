import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ToDoListsService } from './to-do-lists.service';
import { ToDoList as ToDoListModel } from '@prisma/client';

@Controller('lists')
export class ToDoListsController {
  constructor(private readonly toDoListsService: ToDoListsService) {}
  @Get()
  async getLists(): Promise<ToDoListModel[]> {
    return this.toDoListsService.toDoLists({});
  }

  @Get(':id')
  async getListById(@Param('id') id: string): Promise<ToDoListModel> {
    return this.toDoListsService.toDoList({ id: id });
  }

  @Post('new')
  async create(
    @Body() createToDoListDto: ToDoListModel,
  ): Promise<ToDoListModel> {
    return this.toDoListsService.createToDoList(createToDoListDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<ToDoListModel> {
    return this.toDoListsService.deleteToDoList({ id });
  }
}
