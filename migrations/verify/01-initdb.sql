-- Verify oparty:initdb on pg

BEGIN;

SELECT * 
FROM "user", "event", "participation"
WHERE false;

ROLLBACK;
