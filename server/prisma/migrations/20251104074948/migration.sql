/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `description`,
    MODIFY `newPrice` VARCHAR(191) NOT NULL,
    MODIFY `oldPrice` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NULL;
