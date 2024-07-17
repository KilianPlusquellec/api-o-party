
CREATE DOMAIN "zip_code_city" AS text
CHECK(value ~ '^\d{5} [ A-Za-zÀ-ÖØ-öø-ÿ''\-]+$');  -- accepte code postal français  suivi d'un espace et de la ville


ALTER TABLE "event"
  ADD COLUMN "zip_code_city" zip_code_city NOT NULL; 

