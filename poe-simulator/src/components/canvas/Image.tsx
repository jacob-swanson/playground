import * as React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as PIXI from 'pixi.js';
import { Sprite } from '../../pixi/PixiRenderer';

export interface ImageProps {
    url: string,
    x?: number,
    y?: number,
    offsetX?: number,
    offsetY?: number,
    center?: boolean,
    centerX?: boolean,
    centerY?: boolean,
    scale?: number,
    mirrorX?: boolean,
    mirrorY?: boolean,
    getOffsetX?: (image: Image) => number,
    getOffsetY?: (image: Image) => number,
    onClick?: () => void
}

@observer
export class Image extends React.Component<ImageProps> {
    private texture = PIXI.Texture.fromImage(this.props.url);

    @observable private _width: number = 0;
    @observable private _height: number = 0;


    constructor(props: ImageProps) {
        super(props);
        this.texture.on('update', (texture) => {
            this._width = texture.width;
            this._height = texture.height;
        });
    }

    @computed
    get height(): number {
        return this._height;
    }

    @computed
    get width(): number {
        return this._width;
    }

    render() {
        let offsetX = this.props.offsetX || 0;
        let offsetY = this.props.offsetY || 0;
        let scaleX = this.props.scale || 1;
        let scaleY = this.props.scale || 1;

        if (this.props.mirrorX) {
            scaleX *= -1;
        }

        if (this.props.mirrorY) {
            scaleY *= -1;
        }

        if (this.props.getOffsetX) {
            offsetX += this.props.getOffsetX(this);
        }

        if (this.props.getOffsetY) {
            offsetY += this.props.getOffsetY(this);
        }

        const {onClick} = this.props;
        const listening = !!onClick;

        let x = this.props.x || 0;
        let y = this.props.y || 0;
        x += -1 * offsetX;
        y += -1 * offsetY;

        const centerX = this.props.center ? true : this.props.centerX;
        const centerY = this.props.center ? true : this.props.centerY;
        let anchorX = centerX ? 0.5 : 0;
        let anchorY = centerY ? 0.5 : 0;
        if (scaleX < 0) {
            anchorX = 1 - anchorX;
        }
        if (scaleY < 0) {
            anchorY = 1 - anchorY;
        }

        return (
            null
        );
    }
}