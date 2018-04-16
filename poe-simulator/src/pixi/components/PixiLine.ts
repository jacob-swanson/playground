import { PixiRenderable } from './PixiRenderable';

export interface Point {
    x: number;
    y: number;
}

export interface PixiLineProps {
    from: Point;
    to: Point;
    width: number;
    color: number;
}

export class PixiLine extends PIXI.Graphics implements PixiRenderable<PixiLineProps> {
    updateProps(oldProps: PixiLineProps, newProps: PixiLineProps): void {
        this.lineStyle(newProps.width, newProps.color);
        this.moveTo(newProps.from.x, newProps.from.y);
        this.lineTo(newProps.to.x, newProps.to.y);
        this.endFill();
    }
}