CREATE TABLE `campaign_players` (
	`campaign_id` int NOT NULL,
	`user_id` int NOT NULL,
	`joined_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`character_name` varchar(255),
	`role` varchar(50) NOT NULL DEFAULT 'player',
	CONSTRAINT `campaign_players_campaign_id_user_id_pk` PRIMARY KEY(`campaign_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`dungeon_master_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session_attendees` (
	`session_id` int NOT NULL,
	`user_id` int NOT NULL,
	`joined_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`attended` boolean NOT NULL DEFAULT true,
	`role` varchar(50) NOT NULL DEFAULT 'player',
	CONSTRAINT `session_attendees_session_id_user_id_pk` PRIMARY KEY(`session_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `session_summaries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`session_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `session_summaries_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_summaries_session_id_unique` UNIQUE(`session_id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`campaign_id` int NOT NULL,
	`start_date` datetime NOT NULL,
	`end_date` datetime NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
