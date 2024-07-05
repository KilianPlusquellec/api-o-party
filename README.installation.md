# Installation du projet : 


```bash
npm install

npm run dev
``` 

## Sqitch :

### Configuration : (à faire une fois)
```bash
sudo -i -u postgres
SHOW hba_file;
nano ~/pg_hba.conf
```
local   all             postgres                  trust
```bash
nano ~/bashrc
```
export PGUSER=postgres
```bash
echo $PGUSER 
```
=> postgres (réponse)
```bash
createdb oparty
```
### Postgis :

```bash
sudo apt install postgis postgresql-15-postgis-3

```
Sur macOS (via Homebrew) :
```bash
brew install postgis
```

### Déploiment : 
```bash
sqitch deploy 

psql -d oparty -f data/seeding.sql
```
