import * as React from 'react';
import { KeystoneNodeProps } from './KeystoneNode';
import { loadTexture } from '../SkillSpriteLoader';
import { Sprite } from '../../../pixi/PixiRenderer';

export class NotableNode extends React.Component<KeystoneNodeProps> {
    render() {
        const {x, y, spritePath} = this.props;
        const texture = loadTexture(spritePath, 'notableInactive');
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
                url={'/images/assets/NotableFrameUnallocated-0.3835.png'}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
            />
        ];
    }
}