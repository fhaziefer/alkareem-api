/*
  Warnings:

  - You are about to drop the column `status_id` on the `profile` table. All the data in the column will be lost.
  - The primary key for the `subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_bani_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_generasi_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_subsctiption_id_fkey`;

-- DropIndex
DROP INDEX `profile_status_id_key` ON `profile`;

-- AlterTable
ALTER TABLE `address` MODIFY `street` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `contact` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `instagram` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `status_id`,
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    MODIFY `anak_ke` INTEGER NULL,
    MODIFY `birthday` DATETIME(3) NULL,
    MODIFY `pendidikan` VARCHAR(191) NULL,
    MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `bani_id` INTEGER NULL,
    MODIFY `generasi_id` INTEGER NULL,
    MODIFY `subsctiption_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `subscription` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_bani_id_fkey` FOREIGN KEY (`bani_id`) REFERENCES `bani`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_generasi_id_fkey` FOREIGN KEY (`generasi_id`) REFERENCES `generasi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_subsctiption_id_fkey` FOREIGN KEY (`subsctiption_id`) REFERENCES `subscription`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
