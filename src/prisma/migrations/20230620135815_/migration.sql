/*
  Warnings:

  - Made the column `authorId` on table `ToDoItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `ToDoList` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ToDoItem" DROP CONSTRAINT "ToDoItem_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ToDoList" DROP CONSTRAINT "ToDoList_authorId_fkey";

-- AlterTable
ALTER TABLE "ToDoItem" ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ToDoList" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ToDoList" ADD CONSTRAINT "ToDoList_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDoItem" ADD CONSTRAINT "ToDoItem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
