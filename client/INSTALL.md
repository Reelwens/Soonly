# Installation

## Requis

Le projet ionic nécessite Node.js dans une version récente.

## Débuter avec Ionic

Installez `ionic` et `cordova` en global sur votre machine, puis téléchargez les dépendances du projet :

```
npm install -g ionic cordova
npm install
```

## Visualiser l'application sur navigateur

Au sein du dossier `/client`, excutez la commande suivante :

```
ionic serve
```

Répondre oui au premier choix, et non au second.

## Build l'application .apk

Requis :
* Java JDK
* Android Studio

Excutez la commande suivante :
```
ionic cordova build android
```
