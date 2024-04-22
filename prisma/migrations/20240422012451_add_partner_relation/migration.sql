-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `husband_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_husband_id_fkey` FOREIGN KEY (`husband_id`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
