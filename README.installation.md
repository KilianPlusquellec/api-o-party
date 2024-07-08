# Installation du projet back end: 

## Installation des dépendances : 

```bash
npm install
``` 

## Sqitch :

### Configuration : (à faire une fois)
Accéder à l'Utilisateur PostgreSQL :

```bash
sudo -i -u postgres
```

Affichez le chemin du fichier :

```bash
SHOW hba_file;
```

Ouvrez le fichier pour le modifier :

```bash
nano ~/pg_hba.conf
```
Ajoutez ou modifiez la ligne suivante pour permettre l'accès local :

```bash
local   all     postgres      trust
```

Configurer la Variable d'Environnement PGUSER.
Ouvrez le fichier .bashrc :

```bash
nano ~/bashrc
```

Ajoutez la ligne suivante à la fin du fichier :
```bash
export PGUSER=postgres
```

Vérifiez que la variable est correctement définie :

```bash
echo $PGUSER 
```
La réponse devrait être postgres.

Créer la Base de Données :

```bash
createdb oparty 
```

## Installation de PostGIS :

Vérifier sa version de Postgrès : 

```bash
psql -V
```
Puis installation sur Ubuntu: 

```bash
sudo apt install postgis postgresql-15-postgis-3
```
(exemple si sa version est 14.12, utiliser la commande ci-dessus en remplaçant 15 par 14.)


Sur macOS (via Homebrew) :
(Il n'est pas nécessaire de vérifier sa version sur Mac).

```bash
brew install postgis
```

## Déploiment de la Base de Données :  

```bash
psql oparty
```

```sql
CREATE EXTENSION postgis;
```

```bash
sqitch deploy 
```

Seed la Base de Données :

```bash
psql -d oparty -f seeders/seeding_v2.sql
```
(utiliser la derière version de seeding du dossier seeders).

## Lancer l'Application :

Après avoir suivi toutes les étapes ci-dessus, vous pouvez lancer l'application en mode développement :

```bash
npm run dev
```
