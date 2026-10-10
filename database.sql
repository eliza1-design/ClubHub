CREATE DATABASE IF NOT EXISTS clubhub_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clubhub_db;

CREATE TABLE IF NOT EXISTS members (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_members_email (email)
) ENGINE=InnoDB
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS clubs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NULL,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS member_clubs (
  member_id INT UNSIGNED NOT NULL,
  club_id INT UNSIGNED NOT NULL,
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (member_id, club_id),
  CONSTRAINT fk_member_clubs_member
    FOREIGN KEY (member_id) REFERENCES members (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_member_clubs_club
    FOREIGN KEY (club_id) REFERENCES clubs (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Add the clubs already shown on the homepage to the selectable database list.
INSERT INTO clubs (name, category, description)
SELECT 'Klubi i Teknologjisë', 'Teknologji', 'Eksploro programimin, robotikën dhe idetë e reja digjitale përmes projekteve praktike.'
WHERE NOT EXISTS (SELECT 1 FROM clubs WHERE name = 'Klubi i Teknologjisë');

INSERT INTO clubs (name, category, description)
SELECT 'Klubi i Sportit', 'Sport', 'Merr pjesë në aktivitete sportive, sfida ekipore dhe ushtrime për një jetë aktive.'
WHERE NOT EXISTS (SELECT 1 FROM clubs WHERE name = 'Klubi i Sportit');

INSERT INTO clubs (name, category, description)
SELECT 'Klubi i Artit', 'Art', 'Krijo dhe eksperimento me teknika të ndryshme artistike.'
WHERE NOT EXISTS (SELECT 1 FROM clubs WHERE name = 'Klubi i Artit');

INSERT INTO clubs (name, category, description)
SELECT 'Klubi i Leximit', 'Lexim', 'Ndaj histori, lexo libra dhe diskuto ide me anëtarët e klubit.'
WHERE NOT EXISTS (SELECT 1 FROM clubs WHERE name = 'Klubi i Leximit');

INSERT INTO clubs (name, category, description)
SELECT 'Klubi i Vullnetarizmit', 'Vullnetarizëm', 'Bashkohu në iniciativa vullnetare dhe kontribuo në komunitet.'
WHERE NOT EXISTS (SELECT 1 FROM clubs WHERE name = 'Klubi i Vullnetarizmit');

INSERT INTO clubs (name, category, description)
SELECT 'Klubi i Muzikës', 'Muzikë', 'Zbulo ritme të reja, provo instrumente dhe krijo muzikë së bashku.'
WHERE NOT EXISTS (SELECT 1 FROM clubs WHERE name = 'Klubi i Muzikës');

INSERT INTO clubs (name, category, description)
SELECT 'Klubi i Shkencës', 'Shkencë', 'Bëj eksperimente dhe zbulo si funksionon bota përreth nesh.'
WHERE NOT EXISTS (SELECT 1 FROM clubs WHERE name = 'Klubi i Shkencës');
