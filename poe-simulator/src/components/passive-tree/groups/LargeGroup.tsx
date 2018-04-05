import * as React from 'react';
import { Image } from '../../canvas/Image';
import { GroupProps } from './GroupProps';
import { observer } from 'mobx-react';
import { Sprite } from '../../../pixi/PixiRenderer';

@observer
export class LargeGroup extends React.Component<GroupProps> {
    private getOffsetY = (image: Image) => {
        return image.height;
    };

    render() {
        const {x, y} = this.props;
        return [
            <Sprite
                key="LargeGroup1"
                url={'/images/assets/PSGroupBackground3-0.3835.gif'}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={1}
            />,
            <Sprite
                key="LargeGroup2"
                url={'/images/assets/PSGroupBackground3-0.3835.gif'}
                x={x}
                y={y}
                mirrorY={true}
                anchorX={0.5}
                anchorY={1}
            />
        ];
    }
}