import * as React from 'react';
import { Image } from '../../canvas/Image';
import { GroupProps } from './GroupProps';

export class MediumGroup extends React.Component<GroupProps> {
    render() {
        const {x, y} = this.props;
        return (
            <Image
                url={'/images/assets/PSGroupBackground2-0.3835.gif'}
                x={x}
                y={y}
                center={true}
            />
        );
    }
}