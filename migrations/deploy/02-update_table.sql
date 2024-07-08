-- Deploy oparty:02-update_table to pg

BEGIN;

ALTER TABLE "user"
    ADD COLUMN password_confirmation TEXT NOT NULL;

ALTER TABLE "user"
RENAME COLUMN created_at TO "createdAt";

ALTER TABLE "user"
RENAME COLUMN updated_at TO "updatedAt";

ALTER TABLE "event"
RENAME COLUMN created_at TO "createdAt";

ALTER TABLE "event"
RENAME COLUMN updated_at TO "updatedAt";

ALTER TABLE "participation"
RENAME COLUMN created_at TO "createdAt";

ALTER TABLE "participation"
RENAME COLUMN updated_at TO "updatedAt";

--CREATE EXTENSION postgis; à mettre a la main dans la base de donnée

COMMIT;
