### lancement sqitch 

Pour commencer la migration il faut initialiser avec Sqitch
```bash
createdb oparty

sqitch init oparty --engine=pg --target=db:pg: --top-dir=migrations

sqitch add initdb -n "init"
```
## Un dossier migration se crée, nommer les fichiers :

-on rempli le fichier de ./migrations/deploy/01-initdb.sql
-on rempli le fichier de ./migrations/revert/01-initdb.sql
-on rempli le fichier de ./migrations/verif/01-initdb.sql (optionnel)

- copier le `sqitch.conf` ingoré dans une version partagé `sqitch.example.conf`
- création du fichier `.gitignore` qui permet de décider ce qui doit être ou non versionné (en genéral on y ajoute rapidement le répertoire `/node_modules`)

```bash 
(déploiement de la bdd)

sqitch deploy --verif ou juste sqitch deploy

psql -d oparty -f /data/seeding.sql

psql -d oparty
```

