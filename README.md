Ceci est le code source du projet 7 du parcours développeur web d'Openclassrooms.
Les technologies utilisées pour ce projet sont :

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

Ouvrir le dossier backend dans le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    node server ou nodemon server

## Base de données

Se connecter au serveur MySql de votre choix.

Dans le dossier backend, créer un fichier .env dans lequel vous mettrez :
PASSWORD = (votre mot de passe)
NAME = (votre nom d'user, souvent 'root')

Créer une base de données `groupomaniadb`.

Y importer le fichier groupomaniadb.sql que vous trouverez dans le dossier backend.

Si la connexion à la base de données est bien établie, alors la console affichera "The solution is: 2" (voir backend/models/db:16).
