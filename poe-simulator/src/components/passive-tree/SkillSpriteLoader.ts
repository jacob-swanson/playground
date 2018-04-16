import { SkillSpriteGroups } from './json/SkillSpritesJson';
import { PassiveTreeJson } from './json/PassiveTreeJson';
import { ConsoleLogger } from '../../utils/logger/ConsoleLogger';

const json: PassiveTreeJson = require('./3.1.4.json');
const log = new ConsoleLogger('SkillSpriteLoader');

export function loadTexture(url: string, group: SkillSpriteGroups) {
    const spriteSheets = json.skillSprites[group];
    const spriteSheet = spriteSheets[spriteSheets.length - 1];
    for (const [filename, coords] of Object.entries(spriteSheet.coords).reverse()) {
        if (filename === url) {
            let texture = PIXI.Texture.fromImage(`/images/${spriteSheet.filename}`);
            texture = texture.clone();
            if (texture.width > 1 && texture.height > 1) {
                let {x, y, w, h} = coords;
                texture.frame = new PIXI.Rectangle(x, y, w, h);
            } else {
                texture.on('update', (texture) => {
                    let {x, y, w, h} = coords;
                    try {
                        texture.frame = new PIXI.Rectangle(x, y, w, h);
                    } catch (e) {
                        log.warn(`Exception`, e);
                    }
                });
            }
            return texture;
        }
    }
    throw new Error(`Sprite "${group}/${url}" not found`);
}