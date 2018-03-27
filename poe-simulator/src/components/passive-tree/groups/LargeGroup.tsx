import * as React from 'react';
import { Image } from '../../canvas/Image';
import { GroupProps } from './GroupProps';

export class LargeGroup extends React.Component<GroupProps> {
    private getOffsetX = (image: Image) => {
        return image.width / 2;
    };

    private getOffsetY = (image: Image) => {
        return image.height;
    };

    render() {
        const {x, y} = this.props;
        return [
            <Image
                key={1}
                url={'/images/assets/PSGroupBackground3-0.3835.gif'}
                x={x}
                y={y}
                getOffsetX={this.getOffsetX}
                getOffsetY={this.getOffsetY}
            />,
            <Image
                key={2}
                url={'/images/assets/PSGroupBackground3-0.3835.gif'}
                x={x}
                y={y}
                mirrorY={true}
                getOffsetX={this.getOffsetX}
                getOffsetY={this.getOffsetY}
            />
        ];
    }
}