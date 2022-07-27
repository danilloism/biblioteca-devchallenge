/*
  Warnings:

  - A unique constraint covering the columns `[titulo,editora]` on the table `obra` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "obra_titulo_editora_key" ON "obra"("titulo", "editora");
