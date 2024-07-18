ALTER TABLE "event"
  ADD COLUMN "user_id" int NOT NULL REFERENCES "user" ("id");

