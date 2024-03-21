/*
  Warnings:

  - Made the column `bani_id` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_bani_id_fkey`;

-- AlterTable
ALTER TABLE `profile` MODIFY `bani_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_bani_id_fkey` FOREIGN KEY (`bani_id`) REFERENCES `bani`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
