-- CreateTable
CREATE TABLE `profile_bani` (
    `profileId` VARCHAR(191) NOT NULL,
    `baniId` INTEGER NOT NULL,

    PRIMARY KEY (`profileId`, `baniId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profile_bani` ADD CONSTRAINT `profile_bani_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile_bani` ADD CONSTRAINT `profile_bani_baniId_fkey` FOREIGN KEY (`baniId`) REFERENCES `banis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
