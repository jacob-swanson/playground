import * as PIXI from 'pixi.js';
import { PixiRenderable } from './PixiRenderable';

export interface ReactPixiSpriteProps {
    url: string
    x?: number
    y?: number
    scale?: number
    mirrorX?: boolean
    mirrorY?: boolean
    anchorX?: number
    anchorY?: number
    key?: any
    onClick?: (e: any) => void
}

export class ReactPixiSprite extends PIXI.Sprite implements PixiRenderable<ReactPixiSpriteProps> {
    constructor(texture?: PIXI.Texture) {
        super(texture);
    }

    updateProps(oldProps: ReactPixiSpriteProps, newProps: ReactPixiSpriteProps) {
        if (oldProps.url !== newProps.url) {
            this.texture = PIXI.Texture.fromImage(newProps.url);
        }
        this.buttonMode = true;
        this.x = newProps.x || this.x;
        this.y = newProps.y || this.y;

        let scaleX = newProps.scale || this.scale.x;
        let scaleY = newProps.scale || this.scale.y;
        if (newProps.mirrorX) {
            scaleX *= -1;
        }
        if (newProps.mirrorY) {
            scaleY *= -1;
        }
        this.scale.x = scaleX;
        this.scale.y = scaleY;

        let anchorX = newProps.anchorX || this.anchor.x;
        let anchorY = newProps.anchorY || this.anchor.y;
        if (newProps.scale && newProps.scale < 0) {
            if (newProps.anchorX) {
                anchorX = 1 - anchorX;
            }
            if (newProps.anchorY) {
                anchorY = 1 - anchorY;
            }
        }
        this.anchor.x = anchorX;
        this.anchor.y = anchorY;

        if (newProps.onClick && oldProps.onClick !== newProps.onClick) {
            this.interactive = true;
            this.on('pointerup', newProps.onClick)
        }
    }
}