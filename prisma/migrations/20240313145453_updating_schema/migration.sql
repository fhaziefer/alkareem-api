/*
  Warnings:

  - You are about to alter the column `gender` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_status_id_fkey`;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `status` ENUM('SINGLE', 'MARRIED', 'WIDOWED') NOT NULL DEFAULT 'SINGLE',
    MODIFY `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE';

-- DropTable
DROP TABLE `status`;
