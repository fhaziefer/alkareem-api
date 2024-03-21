/*
  Warnings:

  - Made the column `generasi_id` on table `profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subsctiption_id` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_generasi_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_subsctiption_id_fkey`;

-- AlterTable
ALTER TABLE `profile` MODIFY `bani_id` INTEGER NOT NULL DEFAULT 7,
    MODIFY `generasi_id` INTEGER NOT NULL DEFAULT 10,
    MODIFY `subsctiption_id` VARCHAR(191) NOT NULL DEFAULT 'FREE';

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_generasi_id_fkey` FOREIGN KEY (`generasi_id`) REFERENCES `generasi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_subsctiption_id_fkey` FOREIGN KEY (`subsctiption_id`) REFERENCES `subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
