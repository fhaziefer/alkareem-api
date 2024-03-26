/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `bani` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `generasi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `bani_id_key` ON `bani`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `generasi_id_key` ON `generasi`(`id`);
