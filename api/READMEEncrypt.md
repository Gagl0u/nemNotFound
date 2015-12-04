Service encrypt/decrypt (STABLE)


## SETUP ##
Pour installer l'environnement de développement, il suffit de lancer la commande :

```
npm install
```

Cette commande va télécharger localement au projet, dansle dossier ```node_modules``` :

 * express, qui est le module serveur HTTP
 * crypto-js, qui est le module Crypto-JS de Google packagé pour NPM
 * eslint, qui est un module de validation de la qualité du code (basé ur les règles standard JS)
 * mocha, qui est un module de tests unitaires
 
## Structure du code ##
L'arborescence des dossiers propose :

 * "node_modules/" : héberge les modules NodeJS nécessaires et téléchargés via ```npm install```. Ce dossier est créé par cette dernière commande.
 * "/" : les sources du projet
 * "/index.js" : le "main" de notre application. Il lance juste le serveur.
 * "src/services/crypto.js" : le module maison "crypto" qui expose les méthodes de cryptage et décryptage.
 * "test/" : le dossier contenant les tests unitaires
 * "test/crypto.spec.js" : les tests unitaires du module crypto
 * "test/.eslintignore" : Spécifie à ESLint de ne pas vérifier la qualité de code des tests unitaires
 * "test/mocha.opts" : les options pour Mocha
 * ".eslintrc" : les options pour ESLint
 * "package.json" : la configuration NPM du projet
 * "README.md" : ce fichier
 
## Comment ça marche ##

### app.js ###
index.js encapsule les appels aux services REST (encryptAES/AESPass/TDES et decryptAES/AESPass/TDES) et lance le serveur.

Ces services font appels au module ```crypto``` et ```mobilead```  créé pour ce projet.

### services/crypto.js ###
Il s'agit d'un module (au sens NodeJS du terme) qui expose 4 méthodes :

* encryptAES : encrypte en AES avec une clé et un IV
* encryptAESPass : encrypte en AES avec une passphrase stockée dans le module crypto
* encryptTDES : encrypte en TripleDES avec une passphrase stockée dans le module crypto

* decryptAES : décrypte de l'AES en lui donnant le texte à décrypter, une clé et un IV (encodé en Base64 pour éviter les URL mal formées dans la requête)
* decryptAESPass : décrypte de l'AES en lui donnant le texte à décrypter (encodé en Base64 pour éviter les URL mal formées dans la requête)
* decryptTDES : décrypte du TripleDES en lui donnant le texte à décrypter (encodé en Base64 pour éviter les URL mal formées dans la requête)

* encode : encode un texte en Base64
* decode : décode un texte de Base64 à UTF8

L'encodage en Base64 est obligatoire pour éviter d'avoir des caractères spéciaux dans les paramètres de l'URL du service REST.
par exemple, le caractère / est interdit dans les paramètres REST, pourne pas le confondre avec un délimiteur de paramètre.

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
* http://localhost:xxxx/encryptAESPass/robert
* http://localhost:xxxx/decryptAESPass/VTJGc2RHVmtYMTlaVVNVb1d2dy93RVNKZEpUUUh4eldqdGlZZDRTbnd5dz0= 

localhost:xxxx xxxx:étant le port indiqué dans le fichier index.js
Lancez en localhost si vous avez démarré le serveur via npm start/node index.js
Sinon on peut accéder directement à la ressource via 

nomdedomaine/encryptAESPass/robert, par exemple :
* http://myencryptapp.herokuapp.com/encryptAES/mobiLead/000102030405060708090a0b0c0d0e0f/0000000000000000

## Un peu plus d'infos ##
 * https://www.npmjs.com/
 * http://eslint.org/
 * http://mochajs.org/
 * http://expressjs.com/
 
