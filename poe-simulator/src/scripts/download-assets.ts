import * as fs from 'fs';
import * as path from 'path';
import { NodeHttpClient } from '../utils/http-client/node/NodeHttpClient';
import { LoggerFactory } from '../utils/logger/LoggerFactory';
import * as Url from 'url';
import * as _ from 'lodash';
import { PassiveTreeJson } from '../components/passive-tree/json/PassiveTreeJson';

const json: PassiveTreeJson = require('../../data/passive-tree/3.2.0.json');
const root = '../../public/images/';
const httpClient = new NodeHttpClient();
const log = LoggerFactory.byName('download-assets');

async function download(url: string, dest: string) {
    if (fs.existsSync(dest)) {
        log.debug(`Skipping ${dest}`);
        return;
    }

    log.info(`Downloading: ${url}`);
    const response = await httpClient.get(url);
    const file = fs.createWriteStream(dest);
    await response.pipe(file);
    file.close();
}

function mkdir(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

(async () => {
    log.info('Downloading assets');
    mkdir(root);

    mkdir(`${root}/assets`);
    for (let [assetKey, asset] of Object.entries(json.assets)) {
        for (let [zoomLevel, url] of Object.entries(asset)) {
            const extension = path.extname(url);
            const filename = `assets/${assetKey}-${zoomLevel}${extension}`;
            const dest = `${root}/${filename}`;
            await download(url, dest);
            json.assets[assetKey][zoomLevel] = filename;
        }
    }

    const imageRoot = json.imageRoot;
    mkdir(`${root}/skillSprites`);
    for (let [skillSpriteGroupName, skillSpriteGroup] of _.entries(json.skillSprites)) {
        let i = 0;
        for (let skillSprite of skillSpriteGroup) {
            const url = `${imageRoot}build-gen/passive-skill-sprite/${skillSprite.filename}`;
            const pathname = Url.parse(url).pathname;
            if (!pathname) {
                throw new Error('No pathname');
            }
            const basename = path.basename(pathname);
            const filename = `skillSprites/${basename}`;
            const dest = `${root}/${filename}`;
            await download(url, dest);
            json.skillSprites[skillSpriteGroupName][i].filename = filename;
            i++;
        }
    }

    mkdir(`${root}/extraImages`);
    for (let [key, data] of _.entries(json.extraImages)) {
        const url = `${imageRoot}${data.image}`;
        const pathname = path.basename(data.image);
        const filename = `extraImages/${pathname}`;
        const dest = `${root}/${filename}`;
        await download(url, dest);
        json.extraImages[key].image = filename;
    }

    fs.writeFileSync('data.json', JSON.stringify(json, null, '\t'));
    log.info('Finished downloading assets');
})();