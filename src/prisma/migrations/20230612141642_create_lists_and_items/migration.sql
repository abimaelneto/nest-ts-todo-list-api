-- CreateTable
CREATE TABLE "ToDoList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ToDoList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToDoItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN DEFAULT false,
    "listId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToDoItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToDoItem" ADD CONSTRAINT "ToDoItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ToDoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
