
# Lancement d'un projet

# Important 

## Installer les dépendances de developpement

- Installer Visual Studio Code: https://code.visualstudio.com/

- Installer Homebrew : https://brew.sh/index_fr
- Installer Git : brew install git
- Installer Yarn : brew install yarn
- Installer Node.js, a Javascript runtime environment that enables the local tools : brew install node
- Installer the gulp-cli globally: yarn global add grunt-cli
- Installer watchman
	- `brew update`
	- `brew install watchman`
- Installer Hubl Extension: https://marketplace.visualstudio.com/items?itemName=WilliamSpiro.hubl

## Créer le projet client dans Gitlab

- Créer un nouveau projet dans l'organisation Make The Grade
- Atribuer un nom au projet
- Laisser toutes les options cochées par defaut

## Importer le boilerplate (vous êtes ici)

```bash
git clone [url .git https du boilerplate]
```

- Renommer le dossier
- Synchroniser votre base de code avec le repository gitlab  

```bash
git remote set-url origin [url .git https du nouveau repository]
```

- Dans l'administration du projet Gitlab, Settings > Repository > Protected Branches (expand) > Cliquer sur Unprotect de la branche main
- Faites un premier commit "First commit"

```bash
git commit -m 'First commit'
```

- Déployer vos sources sur master

```bash
git push -uf -origin main 
```



## Installer toutes les dépendances du projet

Lancer la commande à la racine du projet:

```bash
yarn
```

## Setup HubSpot

# package.json

- Modifier le name du projet 
- Associer le portail de developpement

    **"hs:sync-dev": "yarn gen:fields; yarn build:icons; hs upload --overwrite --portal=[*NOM DU PORTAIL DE DEV*]  dist [*NOM DU TEMPLATE DANS HUBSPOT*]"**

- Associer le portail de production

    **"hs:sync-prod": "yarn gen:fields; yarn build:icons; hs upload --overwrite --portal=[*NOM DU PORTAIL DE PROD*]  dist [*NOM DU TEMPLATE DANS HUBSPOT*]"**,

- S'authentifier sur le portail du client (**le portail de production**) en suivant la procédure officielle d'HubSpot

```bash
yarn hs:auth
```

*Laissez-vous guider* - *Le nom du template doit être similaire au le nom utilisé dans le package.json*

- Modifier le nom des templates

 1.  src/theme.json -> Mettre à jour le label
 2. src/templates -> Mettre à jour le nom blog-listing / blog-post + pages/multi-purpose.html + pages/landing-page.html  + system/*
 3. Renommer tous les boilerplate -mtg -hubspot par le nom du projet

- Configurer l'auto-deploiement
	- 
- Dans le fichier deploy-file.sh, modifier la ligne numéro la ligne en indiquant le nom de votre portail de dev et ainsi que le nom du projet 

- Déployer une premiere fois pour s'assurer du bon paramétrage en executant la commande yarn deploy:dev | yarn deploy:prod

- Se rendre sur le portail -> Créer une première page en selectionnant le thême précedemment renommer dans la base de code.


- Pour développer en continu lancer la commande yarn start, cette commande permettra d'activer un watch sur le css et le js | pour activer le watch sur vods modules et vos templates lancer la commande 

```bash
watchman-wait . --max-events 0 -p 'src/modules/**/*.json' 'src/modules/**/*.html' | while read line; do ./deploy-file.sh $line; done
```

L'aventure commence
-	
- Réaliser le guide de style : **function.scss** pour setup vos variables de style

## 🚦Pour créer un nouveau module :

    yarn hs:module

Cela va déclencher un utilitaire te permettant de choisir quel type de module tu souhaites développer; pour cela 2 options : 
	

 1. from **scratch**, c'est un a dire un module vierge où tu pars d'une feuille blanche
 2. **impero**, c'est à dire un module inspiré d'un module déjà existant et référencé dans notre bibliothèque de module. Une recherche en autocomplétion est disponible pour t'aider à choisir ton module de référence.
 
 Une fois que tu auras donné un nom au module, un sous-dossier sera généré dans le dossier sr/modules avant la nomenclature [nom-du-module].module, il sera composé des différents fichiers permettant son paramétrage. Aussi un fichier .scss sera généré pour composé sa feuille de style.

Si tu as la moindre question, n'hésites pas à contacter Andrew Bouvet - c'est le meilleur dev de Make The Grade.

✌️
