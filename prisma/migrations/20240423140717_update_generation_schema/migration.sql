-- AlterTable
ALTER TABLE `generasis` ADD COLUMN `generasi_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profiles` MODIFY `generasi_id` INTEGER NOT NULL DEFAULT 12;
