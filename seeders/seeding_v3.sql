BEGIN;

TRUNCATE "user", event, participation RESTART IDENTITY;

INSERT INTO "user"(first_name, last_name, birth_date, address, email, password, password_confirmation, about, profil_picture) VALUES
('Noé', 'Plantier', '1998-03-23', 'Pl Général de Gaulle 50000 Saint-Lô', 'plantiernoe50@gmail.com', '$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de', '$2b$10$gV8D9RnGjpdVuSqV640SpupOMG0KujQCs/4Grzq0ZUF57t/1vSFyi','Je suis un passionné de jardinage', 'https://avatars.githubusercontent.com/u/157673098?v=4'),
('Léa', 'Plantier', '2002-02-28', 'Pl Général de Gaulle 50000 Saint-Lô', 'plantierlea50@gmail.com', '$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de', '$2b$10$gV8D9RnGjpdVuSqV640SpupOMG0KujQCs/4Grzq0ZUF57t/1vSFyi','Je suis une passionnée', null),
('Florent', 'Desallangre', '1997-10-10', 'Pl Honoré Daumier 95760 Valmondois ', 'florent.desallangre@oclock.school','$2b$10$MsPn54lAwKb6eliuhY5.Oe6LwcMKsia4sIO50/41D2ysO9SRXK3de', '$2b$10$gV8D9RnGjpdVuSqV640SpupOMG0KujQCs/4Grzq0ZUF57t/1vSFyi','bonsoir non', 'https://avatars.githubusercontent.com/u/157001794?v=4');


INSERT INTO event(title, description, start_date, finish_date, start_hour, address, zip_code_city, location, privacy_type, picture, max_attendee, status, pmr_access) VALUES 
('Concert Rock', 'Un super concert de rock en plein air.', '2024-07-09', '2024-07-09', '19:00:00', '8, rue du Centre', '75007 Paris', ST_GeogFromText('SRID=4326;POINT(48.8549158 2.3128591)'), FALSE, null, 100, TRUE, TRUE),
('Soirée électro ', 'découvrez le meilleur DJ de Lyon.', '2024-08-01', '2024-08-01', '22:00:00', '7, rue des Lilas', '69000 Lyon', ST_GeogFromText('SRID=4326;POINT(45.5603292 4.8064673)'), FALSE, 'https://avatars.githubusercontent.com/u/157673098?v=4', 120, TRUE, TRUE),
('Concert Jazz', 'Concert des plus grands artistes Jazz .', '2024-09-05', '2024-09-06', '21:00:00', '12, rue de l''Eglise', '13011 Marseille', ST_GeogFromText('SRID=4326;POINT(43.2855958 5.4123418)'), TRUE, null, 30, TRUE, FALSE),
('Rave party', 'Rave party dans ma campagne.', '2024-10-20', '2024-10-23', '20:00:00', '1, chemin de Saint-Hubert', '95760 Valmondois', ST_GeogFromText('SRID=4326;POINT(49.0973 2.19)'), FALSE, 'https://avatars.githubusercontent.com/u/157001794?v=4', 200, 'TRUE', TRUE);



INSERT INTO "participation"(approval, user_id, event_id) VALUES
(FALSE, 1, 2),
(FALSE, 2, 1),
(TRUE, 3, 4),
(FALSE, 3, 3);

COMMIT;

