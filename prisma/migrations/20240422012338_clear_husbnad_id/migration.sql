/*
  Warnings:

  - You are about to drop the column `husband_id` on the `profiles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `profiles_husband_id_key` ON `profiles`;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `husband_id`;
