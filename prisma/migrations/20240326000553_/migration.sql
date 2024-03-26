/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bani` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `generasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `contact` DROP FOREIGN KEY `contact_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_bani_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_generasi_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_husband_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_parent_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_subsctiption_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_user_id_fkey`;

-- DropTable
DROP TABLE `address`;

-- DropTable
DROP TABLE `bani`;

-- DropTable
DROP TABLE `contact`;

-- DropTable
DROP TABLE `generasi`;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `subscription`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `banis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bani_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generasis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `generasi_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `subscription_name` VARCHAR(191) NOT NULL,
    `subcription_price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN', 'KOORHANNAH', 'KOORSALAMAH', 'KOORAISYAH', 'KOORMARYAM', 'KOORZAINAB', 'KOORQOMARIYAH') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    `anak_ke` INTEGER NULL,
    `birthday` DATE NULL,
    `pendidikan` VARCHAR(191) NULL,
    `alive_status` BOOLEAN NOT NULL DEFAULT true,
    `avatar` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `bani_id` INTEGER NOT NULL DEFAULT 7,
    `generasi_id` INTEGER NOT NULL DEFAULT 10,
    `parent_id` VARCHAR(191) NULL,
    `husband_id` VARCHAR(191) NULL,
    `subsctiption_id` VARCHAR(191) NOT NULL DEFAULT 'FREE',
    `status` ENUM('SINGLE', 'MARRIED', 'WIDOWED', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profiles_user_id_key`(`user_id`),
    UNIQUE INDEX `profiles_husband_id_key`(`husband_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NULL,
    `village` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `profile_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `addresses_profile_id_key`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `profile_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `contacts_profile_id_key`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_bani_id_fkey` FOREIGN KEY (`bani_id`) REFERENCES `banis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_generasi_id_fkey` FOREIGN KEY (`generasi_id`) REFERENCES `generasis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_subsctiption_id_fkey` FOREIGN KEY (`subsctiption_id`) REFERENCES `subscriptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_husband_id_fkey` FOREIGN KEY (`husband_id`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
