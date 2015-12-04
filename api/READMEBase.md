Service encode/decode (BETA WIP)

=>Résultats incohérents (sur certains cas) mais decode(encode(x)) = x . 

=>Bases supportées : b16c, b62c, b64c/u/x, b73x

## SETUP ##
Pour installer l'environnement de développement, il suffit de lancer la commande :

```
npm install
```

Cette commande va télécharger localement au projet, dansle dossier ```node_modules``` :

 * express, qui est le module serveur HTTP
 * eslint, qui est un module de validation de la qualité du code (basé ur les règles standard JS)
 * mocha, qui est un module de tests unitaires
 
## Structure du code ##
L'arborescence des dossiers propose :

 * "node_modules/" : héberge les modules NodeJS nécessaires et téléchargés via ```npm install```. Ce dossier est créé par cette dernière commande.
 * "/" : les sources du projet
 * "/index.js" : le "main" de notre application. Il lance juste le serveur.
 * "src/services/mobilead.js" : le module maison "encode" qui expose les méthodes d'encodage et de décodage.
 * "test/" : le dossier contenant les tests unitaires
 * "test/crypto.spec.js" : les tests unitaires du module crypto
 * "test/.eslintignore" : Spécifie à ESLint de ne pas vérifier la qualité de code des tests unitaires
 * "test/mocha.opts" : les options pour Mocha
 * ".eslintrc" : les options pour ESLint
 * "package.json" : la configuration NPM du projet
 * "README.md" : ce fichier
 
## Comment ça marche ##

### app.js ###
index.js encapsule les appels au service REST (changeBaseFront) et lance le serveur.

Ces services font appels au module ```pad_radix``` et ```mobilead```  créé pour ce projet.

### services/mobilead.js ###
Il s'agit d'un module (au sens NodeJS du terme) qui expose 1 méthode :

* changeBaseFront : passer d'un encodage à un autre, on lui donne une base d'entrée et d'arrivée ainsi que le message à encoder.

### Les tests unitaires ###
Les tests unitaires sont indispensable à la maintenance d'un projet.
Tant que tous les tests untaires sont au vert, c'est qu'on n'a pas tout cassé. Faire un maximum de tests unitaires pertinents est donc indispensables pour éviter les régressions tout au long du projet.

les tests unitaires se situent dans le dossier ```test``` et utilisent la librairie ```Mocha JS``` en mode BDD pour la syntaxe.


## Les commandes à lancer ##
* Initialiser le projet : 
```
npm install
```

* Lancer le serveur :
```
npm start
```
ou
```
node index.js
```
 
* Lancer les tests unitaires (ne marche pas sur heroku? WIP) :
``` 
npm test
```
ou 
``` 
mocha -w 
```

* Lancer la vérification de qualité de code  (ne marche pas sur heroku? WIP) :
```
eslint src/.
```

### Exemples d'appels aux services ###
* http://localhost:xxxx/changeBase/rdicJd9/b64u/b73x

localhost:xxxx xxxx:étant le port indiqué dans le fichier index.js
Lancez en localhost si vous avez démarré le serveur via npm start/node index.js
Sinon on peut accéder directement à la ressource via

nomdedomaine/changeBase/rdicJd9/b64u/b73x, par exemple : 
* https://myencodeapp2.herokuapp.com/changeBase/rdicJd9/b64u/b73x

## Un peu plus d'infos ##
 * https://www.npmjs.com/
 * http://eslint.org/
 * http://mochajs.org/
 * http://expressjs.com/
 
