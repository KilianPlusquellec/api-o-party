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
