import * as PIXI from 'pixi.js';
import { PixiRenderable } from './PixiRenderable';

export interface ReactPixiSpriteProps {
    texture?: PIXI.Texture
    x?: number
    y?: number
    scaleX?: number
    scaleY?: number
    anchorX?: number
    anchorY?: number
}

export class ReactPixiSprite extends PIXI.Sprite implements PixiRenderable<ReactPixiSpriteProps> {
    constructor(texture?: PIXI.Texture) {
        super(texture);
    }

    updateProps(oldProps: ReactPixiSpriteProps, newProps: ReactPixiSpriteProps) {
        const props = {
            x: this.x || 0,
            y: this.y || 0,
            scaleX: this.scale.x || 1,
            scaleY: this.scale.y || 1,
            anchorX: this.anchor.x || 0,
            anchorY: this.anchor.y || 0,
            ...newProps
        };
        this.x = props.x;
        this.y = props.y;
        this.scale.x = props.scaleX;
        this.scale.y = props.scaleY;
        this.anchor.x = props.anchorX;
        this.anchor.y = props.anchorY;
    }
}