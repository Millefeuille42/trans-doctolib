# Trans Doctolib

## Accreditation
Code, idée et liste d'origine de [msw9](https://github.com/msw9/trans-doctolib-ressources)
repris par [millefeuille](https://github.com/Millefeuille42)

## Introduction
Trans Doctolib est une extension qui permet de voir sur le profil Doctolib d'un praticien, s'il a signé une tribune pro ou anti-trans et d'accéder à la tribune en question en un clic.

Cette application est à utiliser en complément du bouche-à-oreille et d'autres initiatives comme la carte collaborative de l'association Fransgenre.
Mais :
- si vous vivez dans un endroit isolé avec peu ou pas de praticien-nes connu-es par les membres de l'association
- si des membres de l'association oublient d'évaluer les praticiens qu'iels fréquentent
  
Cette extension peut être un dernier recours pour être sûr-e de ne pas prendre rendez-vous avec un-e praticien-ne en désaccord avec les valeurs des utilisateur-ices.

## Confidentialité
Contrairement à la carte Fransgenre qui n'est accessible que par les membres de l'association Fransgenre, cette extension est accessible à tous-tes car toutes les informations utilisées sont publiques. 
Les sources sont dérivées de celles [trouvables ici](https://github.com/msw9/trans-doctolib-ressources)

## Installation 
### Via le store
Firefox: https://addons.mozilla.org/fr/firefox/addon/trans-doctolib/ (En attente de validation)
Chrome: TBA (Not until I get $5 to buy my ✨ **Google license** ✨)

### Manuelle
#### Firefox
1. Télécharger la dernière [release](https://github.com/Millefeuille42/trans-doctolib/releases) au format XPI
2. Taper `about:addons` dans la barre de recherche de Firefox
3. Cliquer sur la roue crantée
4. Cliquer sur `Installer un module depuis un fichier`
5. Parcourir vers et sélectionner le fichier XPI
6. Cliquer sur l'extension nouvellement installée
7. Aller dans l'onglet `Permissions`
8. Cocher les permissions demandées

#### Chrome et dérivés (Opera, Arc...)
1. Télécharger la dernière [release](https://github.com/Millefeuille42/trans-doctolib/releases) au format ZIP
2. Aller sur taper `chrome://extensions/` dans la barre de recherche
3. Cocher `Mode développeur` en haut à droite
4. Cliquer sur `Charger l'extension non empaquetée`
5. Parcourir vers et sélectionner le dossier extrait

## Licence
Code sous licence GNU GPL 3.0.

## For the developers
### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher) installed on your machine.

### Getting Started

1. Clone the project repository to your local machine.
2. Change into the project directory
3. Install project dependencies using npm: `npm install`

### Scripts

This project comes with a set of predefined npm scripts to help with development and building the extension.
You can run these scripts using the following commands:

- `npm run start-v3`: Starts the extension in firefox with `web-ext run` for the V3 version of the extension.
- `npm run build-v3`: Generate manifest, build and packs V3 version of the extension for production.
- `npm run manifest-v3`: Generate extension manifestV3.
- `npm run build-ext-v3`: Packs the V3 extension with `web-ext build`.

### Project Structure

The project has a specific directory structure to separate the code for the V2 and V3 versions of the extension.
The primary files and directories are:

- `src/`: Contains the source code for the extension.
- `dist/`: Output directory for the built extension.
    - `v3/`: Output directory for the V3 version code.
    - `artifacts_v3/`: Output directory for the V3 version of the packed extension.
- `scripts/`: Contains scripts for npm (manifest generation, etc).

### Webpack configuration

The project uses Webpack, Babel and WebExtension-Polyfill for code generation/transpiling/bundling/minifying.
Configuration of webpack is done in [`webpack.config.js`](webpack.config.js).

#### Sources

These variable defines the sources for both versions of the extension. Any file provided here will only be transpiled,
imported files that are not featured here will be bundled with the importing files. This allows to cut huge files in
several smaller files without any compromise, without bundling all the unrelated files in a single file.

```js
const commonSources = {
    // Add common sources to both versions here
    file_1: './src/file_1.js',
    file_2: './src/file_2.js',
}

const v2Sources = {
    // Add v2 specific sources here
}

const v3Sources = {
    // Add v3 specific sources here
}
```

Example with file_1 being :
```js
import hello from "./file_3"
import goodbye from "./file_2"

hello("world")
goodbye("world")
```

As `file_3` is not in webpack sources, it will be bundled with `file_1`, meanwhile `file_2` will not be bundled
since it is in the webpack sources.


#### Additional configuration

Additional configuration can be provided through the `commonConfig` (and specific `Config` elements).
Static files (such as icons) can be sent to dist folder with the `CopyPlugin` webpack plugin.

```js
plugins: [
  new CopyPlugin({
    patterns: [
      { from: "src/icons", to: "icons" },
      { from: "node_modules/webextension-polyfill/dist/browser-polyfill.js", to: "polyfill.js" },
    ],
  }),
]
```

### Manifest

Extension's Manifest only needs to be written in the V2 version as `src/manifest.json`, it will automatically be
copied (and adapted to V3) in the `dist` folders during build time.

To import WebExtension-Polyfill into the extension, the file `polyfill.js` must be used in all `content_scripts` targets.

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.example.com/*"],
      "js": [
        "polyfill.js",
        "file_com.js"
      ]
    },
    {
      "matches": ["*://*.example.fr/*"],
      "js": [
        "polyfill.js",
        "file_fr.js"
      ]
    }
  ]
}
```
