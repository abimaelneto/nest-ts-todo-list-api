import { Module } from '@nestjs/common';
import { ToDoItemsController } from './to-do-items.controller';
import { ToDoItemsService } from './to-do-items.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ToDoItemsController],
  providers: [ToDoItemsService, PrismaService],
})
export class ToDoItemsModule {}
