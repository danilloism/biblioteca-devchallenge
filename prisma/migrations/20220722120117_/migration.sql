/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `autor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "autor_nome_key" ON "autor"("nome");
