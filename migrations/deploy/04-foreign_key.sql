-- Deploy oparty:04-foreign_key to pg

BEGIN;

ALTER TABLE "event"
  ADD COLUMN "user_id" int NOT NULL REFERENCES "user" ("id");


COMMIT;
