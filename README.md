# SAÉ 5

> Auteurs: Ugo Claus & Flavien Marck

> Lien du dépôt: [Github](https://github.com/flaw9/sae5)

# Déploiement

Avant de lancer le projet, il faut créer un fichier `.env` dans le dossier [`backend`](./backend) et y ajouter les variables suivantes, si vous souhaitez utiliser une base de données différente de celle utilisée lors du développement :

```env
MYSQL_HOST=<host>
MYSQL_USER=<user>
MYSQL_PASSWORD=<password>
MYSQL_DATABASE=<db_name>
```

En ajoutant la variable `PORT`, vous pouvez changer le port sur lequel le serveur se lancera.

Pour lancer le projet, il vous suffit d'ouvrir la console dans le dossier [`backend`](./backend) et d'y lancer la commande `docker compose up -d`. Le serveur se lancera sur le port 3000 par défaut, dans un docker.