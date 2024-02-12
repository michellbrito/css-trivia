-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `logged_in_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trivia_topics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trivia_submissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `trivia_question_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `score` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trivia_submission_options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trivia_submission_id` INTEGER NOT NULL,
    `trivia_option_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trivia_questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trivia_options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trivia_question_id` INTEGER NOT NULL,
    `option_text` VARCHAR(191) NOT NULL,
    `is_correct` BOOLEAN NOT NULL,
    `trivia_topic_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trivia_submissions` ADD CONSTRAINT `trivia_submissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trivia_submissions` ADD CONSTRAINT `trivia_submissions_trivia_question_id_fkey` FOREIGN KEY (`trivia_question_id`) REFERENCES `trivia_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trivia_submission_options` ADD CONSTRAINT `trivia_submission_options_trivia_submission_id_fkey` FOREIGN KEY (`trivia_submission_id`) REFERENCES `trivia_submissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trivia_submission_options` ADD CONSTRAINT `trivia_submission_options_trivia_option_id_fkey` FOREIGN KEY (`trivia_option_id`) REFERENCES `trivia_options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trivia_options` ADD CONSTRAINT `trivia_options_trivia_question_id_fkey` FOREIGN KEY (`trivia_question_id`) REFERENCES `trivia_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trivia_options` ADD CONSTRAINT `trivia_options_trivia_topic_id_fkey` FOREIGN KEY (`trivia_topic_id`) REFERENCES `trivia_topics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
