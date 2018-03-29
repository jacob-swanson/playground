import React = require('react');
import { PassiveTreeJson } from '../json/PassiveTreeJson';
import { Circle, Group } from 'react-konva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as Konva from 'konva';
import { Image } from '../../canvas/Image';


export interface NodeProps {
    x: number;
    y: number;
}

@observer
export class Node extends React.Component<NodeProps> {
    @observable private color = 'green';

    handleClick = () => {
        this.color = Konva.Util.getRandomColor();
    };

    render() {
        const {x, y} = this.props;
        return (
            <Group>
                <Image
                    url={'/images/assets/JewelFrameAllocated-0.3835.png'}
                    x={x}
                    y={y}
                    center={true}
                />
                <Image
                    url={'/images/assets/JewelSocketActiveGreen-0.3835.png'}
                    x={x}
                    y={y}
                    center={true}
                />
            </Group>
        );
    }
}