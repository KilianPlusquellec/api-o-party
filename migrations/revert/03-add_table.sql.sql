-- Revert oparty:03-add_table.sql from pg

BEGIN;

DROP DOMAIN "zip_code_city" CASCADE;

COMMIT;
