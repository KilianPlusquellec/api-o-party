# Nom du projet : O'Party 🎉
### Description :

O'Party est une plateforme innovante qui permet aux utilisateurs d'organiser et de participer à des soirées et des événements partout en France. Accessible sur mobile et PC. O'Party permet de créer des liens sociaux et d'enrichir les expériences des utilisateurs grâce à des événements variés, allant des soirées entre amis aux évènements dans toute la France.

### Mais comment ça fonctionne ? Voici les fonctionnalités principales : 🛠️
- Créer son profil. D'abord tu t'inscris avec ton mail et un mot de passe (à saisir 2 fois au cas où ...).

--> router POST `/register`

--> router POST `/login` pour te connecter

Puis je te conseille de compléter ton profil avec ton nom, prénom, adresse. Ajoute une description (ce que tu aimes, tes hobbies ...) puis tu peux y ajouter ta plus belle photo.

--> router GET `/user/me`

Une faute sur ta description ? Tu peux modifier ton profil, même le supprimer si besoin 😞.

--> router PATCH `/user/me`   /  --> router DELETE `/user/me`

- Tu veux trouver des évènements prêt de chez toi ? Très simple, sur la page d'accueil il suffit de rechercher les évènements autour de ta localisation. (accepte le partage de localisation). Tu peux aussi renseigner ta ville et tu trouveras tous les évènements autour de toi. (dans un rayon de 50km).
Tu recherches un style en particulier ? Tu peux aussi rechercher avec les mots clefs (titre d'évènements) qui te sont proposés dans le champs de recherche.

--> router GET `/events`

- Tu peux même accéder au profil de la personne qui organise un évènement. C'est simple :

--> router GET `/user/id`

- Evènement(s) trouvé(s)! Plus qu'à soumettre ta participation sur la page de détail de l'évènement. L'hôte de l'évènement accède aux personnes qui souhaitent participer.

--> router POST `event/:id/participate`

- Le nombres d'inscrits s'affiche sur la page de l'évènement. Mais tu veux voir toutes les demandes de participations ? C'est possible :

--> router GET `/event/:id/participate/all`

- Mince tu ne peux plus venir... Il est possible d'annuler son inscription d'un simple clic. Essaye de ne pas annuler au dernier moment.

--> router DELETE `/event/:id/participate/cancel`

- A toi de proposer un évènement. Tout utilisateur connecté peut proposer un évènement.
Il suffit d'y préciser sa date de début, date de fin, heure de début, sa localisation, le type d'évènement (concert rock, jeux de sociétés...), le nombre de participants max autorisés, y ajouter une photo (c'est mieux ça donne plus envie de venir) et une description de ce que tu organises.
Accessibilité pour tous, n'oublie pas de préciser s'il y a un accès PMR.

--> router POST `/event`

- Mais oui, tu peux modifier et supprimer ton évènement aussi :

--> router PATCH `/event/id` / --> router DELETE `/event/id`

- Des personnes s'inscrivent à l'évènement !! A toi de gérer les participants. Il est possible de les accepter... ou non.

--> router PATCH `/event/:id/participate/accept`

## Les data

Le seeding est dans `seedings_v4.sql`, on y retrouve des données d'utilisateurs, d'évènements et de leur participation.

### Pour aller plus loin

Pour rendre l'expérience encore plus sympa, bientôt tu pourras :
- Choisir la distance à la quelle tu veux trouver des évènements autour de toi.
- Proposer un évènement public ou privé, c'est à dire accessible uniquement sur invitation. Pour l'instant même si ton évènement est privé tu ne peux pas encore limiter à des invitations.
- Discuter entre utilisateurs :
Depuis la page d'un évènement, uniquement pour les utilisateurs connectés.
Ca sera un chat entre chaque participant et hôte d'un évènement.

- Pourquoi pas ajouter une liste de courses à un évènement. Chaque participant peut cocher dans la liste ce qu'il pourra apporter.

- Plus de photos ou vidéos pour partager les souvenirs de la super soirée passée.
Les hôtes pourront ajouter des photos/vidéos des évènements qu'ils ont organisés et les rendre publics ou privés.
(on veillera à ce que tu es ton mot à dire si tu as participé et que tu es sur des photos).

- Et pour savoir qu'elles sont les meilleurs hôtes ? Tu pourras évaluer les événements et les organisateurs quand tu as participé à une soirée.
Tu pourras attribuer une note sur 5 ainsi qu'un commentaire.
Les notes et commentaires seront accessibles sur le profil de l'hôte.

- Mais bien sûr ça sera bien de pouvoir évaluer les participants. Eh oui. De même, l'organisateur pourra attribuer une note sur 5 et un commentaire suite à une participation à une soirée.

- Et d'autres à venir...