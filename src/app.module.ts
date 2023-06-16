import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoListsModule } from './to-do-lists/to-do-lists.module';
import { ToDoItemsModule } from './to-do-items/to-do-items.module';

@Module({
  imports: [ToDoListsModule, ToDoItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
