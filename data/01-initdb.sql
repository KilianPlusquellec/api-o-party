
-- Regex email:
CREATE DOMAIN "email" AS text
CHECK(value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])');

CREATE TABLE "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "birth_date" DATE NOT NULL,
  "address" text NOT NULL,
  "email" email NOT NULL UNIQUE,
  "password" text NOT NULL,
  "about" text,
  "profil_picture" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

/*EPSG:4326 est idéal pour des analyses précises et des calculs géospatiaux, tandis qu'EPSG:3857 est mieux adapté pour les visualisations web où l'interaction et la rapidité de rendu sont prioritaires. Le choix entre ces deux systèmes dépend donc des besoins spécifiques de l'application. Pas adapté pour des mesures précises*/

CREATE TABLE "event" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "start_date" DATE NOT NULL,
  "finish_date" DATE NOT NULL,
  "start_hour" TIME NOT NULL,
  "address" text NOT NULL,
  "location" geography(POINT, 4326),
  "privacy_type" BOOLEAN DEFAULT FALSE,
  "picture" text,
  "max_attendee" INT NOT NULL,
  "status" BOOLEAN DEFAULT FALSE,
  "pmr_access" BOOLEAN DEFAULT FALSE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "participation" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "approval" BOOLEAN DEFAULT FALSE,
  "user_id" int NOT NULL REFERENCES "user" ("id"),
  "event_id" int NOT NULL REFERENCES "event" ("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);
