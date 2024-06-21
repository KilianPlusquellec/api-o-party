# Modèle Conceptuel de Données - O'Party 🎉


| Entité             | Attributs                                                      |
|--------------------|----------------------------------------------------------------|
| Utilisateur        | ID_Utilisateur (PK), Nom, Prénom, Email, Mot_de_Passe,         |
|                    | Date_Naissance, Sexe, Adresse, Téléphone                       |
|--------------------|----------------------------------------------------------------|
| Événement          | ID_Événement (PK), Nom, Description, Date_Heure_Début,         |
|                    | Date_Heure_Fin, Lieu, Type_Événement, Organisateur (FK)        |
|--------------------|----------------------------------------------------------------|
| Participation      | ID_Participation (PK), Utilisateur_ID (FK), Événement_ID (FK), |
|                    | Statut                                                         |
|--------------------|----------------------------------------------------------------|
| Équipe             | ID_Équipe (PK), Nom                                            |
|--------------------|----------------------------------------------------------------|
| Développeur        | ID_Développeur (PK), Nom, Prénom, Email, Rôle                  |
|--------------------|----------------------------------------------------------------|
| Travaille_Sur      | Développeur_ID (FK), Équipe_ID (FK)                            |
|--------------------|----------------------------------------------------------------|
| Message            | ID_Message (PK), Contenu, Date_Heure_Envoi,                    |
|                    | Utilisateur_Expéditeur (FK), Utilisateur_Destinataire (FK)     |
|--------------------|----------------------------------------------------------------|
| Application        | ID_Application (PK), Nom, Type, Version                        |
|--------------------|----------------------------------------------------------------|






| Relation                 | Description                                                    |
|--------------------------|----------------------------------------------------------------|
| Utilisateur - Événement  | Un utilisateur organise plusieurs événements.                 |
|                          | Un événement est organisé par un utilisateur.                 |
|--------------------------|----------------------------------------------------------------|
| Utilisateur - Événement  | Un utilisateur participe à plusieurs événements.              |
| (Participation)          | Un événement a plusieurs participants.                        |
|--------------------------|----------------------------------------------------------------|
| Développeur - Équipe     | Un développeur travaille sur plusieurs équipes.               |
|                          | Une équipe a plusieurs développeurs.                          |
|--------------------------|----------------------------------------------------------------|
| Utilisateur - Message    | Un utilisateur envoie plusieurs messages.                     |
|                          | Un message a un expéditeur et un destinataire (utilisateur).  |
|--------------------------|----------------------------------------------------------------|
| Équipe - Application     | Une équipe développe plusieurs applications.                  |
|                          | Une application est développée par plusieurs équipes.         |
|--------------------------|----------------------------------------------------------------|
