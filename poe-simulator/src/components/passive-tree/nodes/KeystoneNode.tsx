import * as React from 'react';
import { Sprite } from '../../../pixi/PixiRenderer';
import { loadTexture } from '../SkillSpriteLoader';

export interface KeystoneNodeProps {
    x: number;
    y: number;
    spritePath: string;
}

export class KeystoneNode extends React.Component<KeystoneNodeProps> {
    render() {
        const {x, y, spritePath} = this.props;
        const texture = loadTexture(spritePath, 'keystoneInactive');
        return [
            <Sprite
                key={1}
                texture={texture}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
            />,
            <Sprite
                key={2}
                url={'/images/assets/KeystoneFrameUnallocated-0.3835.png'}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
            />
        ];
    }
}