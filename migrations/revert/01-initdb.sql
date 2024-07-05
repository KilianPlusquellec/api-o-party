-- Revert oparty:initdb from pg

BEGIN;

DROP TABLE "participation";
DROP TABLE "event";
DROP TABLE "user";

DROP DOMAIN "email";

COMMIT;
