import * as React from 'react';
import { Image } from '../../canvas/Image';
import { GroupProps } from './GroupProps';
import { observer } from 'mobx-react';

@observer
export class LargeGroup extends React.Component<GroupProps> {
    private getOffsetY = (image: Image) => {
        return image.height;
    };

    render() {
        const {x, y} = this.props;
        return [
            <Image
                key="LargeGroup1"
                url={'/images/assets/PSGroupBackground3-0.3835.gif'}
                x={x}
                y={y}
                centerX={true}
                getOffsetY={this.getOffsetY}
            />,
            <Image
                key="LargeGroup2"
                url={'/images/assets/PSGroupBackground3-0.3835.gif'}
                x={x}
                y={y}
                mirrorY={true}
                centerX={true}
            />
        ];
    }
}