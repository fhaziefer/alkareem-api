-- AlterTable
ALTER TABLE `profile` MODIFY `status` ENUM('SINGLE', 'MARRIED', 'WIDOWED', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN';
