import { Node, NodeProps } from './Node';
import * as React from 'react';
import { Sprite } from '../../../pixi/PixiRenderer';
import { loadTexture } from '../SkillSpriteLoader';

export interface MasteryNodeProps {
    x: number;
    y: number;
    spritePath: string;
}

export class MasteryNode extends React.Component<MasteryNodeProps> {
    render() {
        const {x, y, spritePath} = this.props;
        const texture = loadTexture(spritePath, 'mastery');
        return (
            <Sprite
                texture={texture}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
            />
        );
    }
}