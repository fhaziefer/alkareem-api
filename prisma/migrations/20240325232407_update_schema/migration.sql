-- DropIndex
DROP INDEX `bani_id_key` ON `bani`;

-- DropIndex
DROP INDEX `generasi_id_key` ON `generasi`;

-- DropIndex
DROP INDEX `subscription_id_key` ON `subscription`;

-- AlterTable
ALTER TABLE `profile` ALTER COLUMN `bani_id` DROP DEFAULT;
