import { Module } from '@nestjs/common';
import { ToDoListsController } from './to-do-lists.controller';
import { ToDoListsService } from './to-do-lists.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ToDoListsController],
  providers: [ToDoListsService, PrismaService],
})
export class ToDoListsModule {}
