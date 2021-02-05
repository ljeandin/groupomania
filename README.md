Ceci est le code source du projet 7 du parcours développeur web d'Openclassrooms.
Les technologies utilisées pour ce projet sont :

-   Frontend : VueJs
-   Backend : NodeJs + express
-   Base de données : Mysql

## Frontend

Ouvrez le dossier Frontend dans le terminal de votre éditeur puis exécutez la commande:

    vue ui

si le navigateur ne s'ouvre pas automatiquement aller à :

-   http://localhost:8080/

puis cliquez sur "Tâches" puis "serve" puis "Lancer la tâche" et enfin "Ouvrir l'app"

## Backend

Ouvrez le dossier backend dans le terminal de votre éditeur puis exécutez la commande:

    npm install

puis

    node server ou nodemon server

## Base de données

Connectez-vous au serveur MySql de votre choix.

Dans le dossier backend, créez un fichier .env dans lequel vous inquerez :

    PASSWORD = (votre mot de passe)
    NAME = (votre nom d'user, souvent 'root')

Créez une base de données nommée `groupomaniadb`.

Y importer le fichier `groupomaniadb.sql` que vous trouverez dans le dossier backend.

Si la connexion à la base de données est bien établie, alors la console affichera `"The solution is: 2"` (voir backend/models/db:16).
