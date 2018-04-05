import * as React from 'react';
import { Image } from '../../canvas/Image';
import { GroupProps } from './GroupProps';
import { Sprite } from '../../../pixi/PixiRenderer';

export class MediumGroup extends React.Component<GroupProps> {
    render() {
        const {x, y} = this.props;
        return (
            <Sprite
                url={'/images/assets/PSGroupBackground2-0.3835.gif'}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
            />
        );
    }
}