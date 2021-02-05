Ceci est le code source du projet 7 du parcours développeur web d'Openclassrooms.
Les technologies utilisées pour ce projet :

-   VueJs
-   NodeJs + express
-   Mysql

## Frontend

Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande:

    vue ui

si le navigateur ne s'ouvre pas automatiquement aller à :

-   http://localhost:8080/

puis cliquer sur "Tâches" puis "serve" puis "Lancer la tâche" et enfin "Ouvrir l'app"

## Backend

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    node server ou nodemon server

## Base de données

Se connecter au serveur MySql de votre choix.
Exécuter la commande: `CREATE DATABASE groupomaniadb;`
Importer le fichier groupomaniadb.sql que vous trouverez dans le dossier backend :

    mysql -u root -p Luludindin88& groupomaniadb < groupomaniadb.sql

Il faudra remplacer `groupomaniadb.sql` par le chemin d'accès au fichier dans votre machine.
Si la connexion à la base de données est bien établie, alors la console affichera "The solution is: 2" (voir backend/models/db:16)
