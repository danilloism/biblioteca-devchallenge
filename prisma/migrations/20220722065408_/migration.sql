-- CreateTable
CREATE TABLE "obra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "editora" TEXT NOT NULL,
    "url_foto" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "autor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AutorToObra" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AutorToObra_A_fkey" FOREIGN KEY ("A") REFERENCES "autor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AutorToObra_B_fkey" FOREIGN KEY ("B") REFERENCES "obra" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AutorToObra_AB_unique" ON "_AutorToObra"("A", "B");

-- CreateIndex
CREATE INDEX "_AutorToObra_B_index" ON "_AutorToObra"("B");
