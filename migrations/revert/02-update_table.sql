-- Revert oparty:02-update_table from pg

BEGIN;

-- DROP EXTENSION postgis;

-- ALTER TABLE "user"
-- RENAME COLUMN createdAt TO created_at;

-- ALTER TABLE "user"
-- RENAME COLUMN updatedAt TO updated_at;

-- ALTER TABLE "event"
-- RENAME COLUMN createdAt TO created_at;

-- ALTER TABLE "event"
-- RENAME COLUMN updatedAt TO updated_at;

-- ALTER TABLE "participation"
-- RENAME COLUMN createdAt TO created_at;

-- ALTER TABLE "participation"
-- RENAME COLUMN updatedAt TO updated_at;


-- ALTER TABLE "user"
--   DROP COLUMN password_confirmation TEXT NOT NULL;

COMMIT;
