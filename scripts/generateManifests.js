// scripts/generateManifests.js

const fs = require('fs');
const manifestV2 = require('../src/manifest.json');

const manifestV3 = {
    ...manifestV2,
    manifest_version: 3,
};

switch (process.env.target) {
    case 'v2':
        fs.writeFileSync('./dist/v2/manifest.json', JSON.stringify(manifestV2, null, 2));
        break
    case 'v3':
        fs.writeFileSync('./dist/v3/manifest.json', JSON.stringify(manifestV3, null, 2));
        break
}



