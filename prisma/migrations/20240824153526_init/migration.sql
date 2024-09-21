/*
  Warnings:

  - Made the column `content` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `Post_title_content_writer_idx` ON `Post`(`title`, `content`, `writer`);
