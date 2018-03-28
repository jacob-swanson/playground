import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Image as KonvaImage } from 'react-konva';

export interface ImageProps {
    url: string,
    x?: number,
    y?: number,
    offsetX?: number,
    offsetY?: number,
    center?: boolean,
    scale?: number,
    mirrorX?: boolean,
    mirrorY?: boolean,
    getOffsetX?: (image: Image) => number,
    getOffsetY?: (image: Image) => number,
    onClick?: () => void
}

@observer
export class Image extends React.Component<ImageProps> {
    @observable private image?: HTMLImageElement = undefined;

    get height(): number {
        if (!this.image) {
            return 0;
        }
        return this.image.height;
    }

    get width(): number {
        if (!this.image) {
            return 0;
        }
        return this.image.width;
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = this.props.url;
        image.onload = () => {
            this.image = image;
        };
    }

    render() {
        if (!this.image) {
            return null;
        }

        const x = this.props.x || 0;
        const y = this.props.y || 0;
        let offsetX = this.props.offsetX || 0;
        let offsetY = this.props.offsetY || 0;
        let scaleX = this.props.scale || 1;
        let scaleY = this.props.scale || 1;

        if (this.props.center) {
            offsetX += this.image.width / 2;
            offsetY += this.image.height / 2;
        }

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

        return (
            <KonvaImage
                x={x}
                y={y}
                offsetX={offsetX}
                offsetY={offsetY}
                image={this.image}
                scaleX={scaleX}
                scaleY={scaleY}
                onClick={this.props.onClick}
                listening={listening}
            />
        );
    }
}