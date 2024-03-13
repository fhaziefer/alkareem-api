-- CreateTable
CREATE TABLE `bani` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bani_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `generasi_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_name` VARCHAR(191) NOT NULL,
    `subcription_price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN', 'KOORHANNAH', 'KOORSALAMAH', 'KOORAISYAH', 'KOORMARYAM', 'KOORZAINAB', 'KOORQOMARIYAH') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `anak_ke` INTEGER NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `pendidikan` VARCHAR(191) NOT NULL,
    `alive_status` BOOLEAN NOT NULL DEFAULT true,
    `avatar` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `bani_id` INTEGER NOT NULL,
    `generasi_id` INTEGER NOT NULL,
    `status_id` INTEGER NOT NULL,
    `parent_id` VARCHAR(191) NULL,
    `husband_id` VARCHAR(191) NULL,
    `subsctiption_id` INTEGER NOT NULL,

    UNIQUE INDEX `profile_user_id_key`(`user_id`),
    UNIQUE INDEX `profile_bani_id_key`(`bani_id`),
    UNIQUE INDEX `profile_generasi_id_key`(`generasi_id`),
    UNIQUE INDEX `profile_status_id_key`(`status_id`),
    UNIQUE INDEX `profile_husband_id_key`(`husband_id`),
    UNIQUE INDEX `profile_subsctiption_id_key`(`subsctiption_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `village` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `postal_code` INTEGER NOT NULL,
    `profile_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `address_profile_id_key`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `instagram` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `profile_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `contact_profile_id_key`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_bani_id_fkey` FOREIGN KEY (`bani_id`) REFERENCES `bani`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_generasi_id_fkey` FOREIGN KEY (`generasi_id`) REFERENCES `generasi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_subsctiption_id_fkey` FOREIGN KEY (`subsctiption_id`) REFERENCES `subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_husband_id_fkey` FOREIGN KEY (`husband_id`) REFERENCES `profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
