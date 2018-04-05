import React = require('react');
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Image } from '../../canvas/Image';
import { Sprite } from '../../../pixi/PixiRenderer';


export interface NodeProps {
    x: number;
    y: number;
}

@observer
export class Node extends React.Component<NodeProps> {
    @observable private color = 'green';

    handleClick = (e: any) => {
        console.log('Node!', e);
    };

    render() {
        const {x, y} = this.props;
        return [
            <Sprite
                key={0}
                url={'/images/assets/JewelFrameAllocated-0.3835.png'}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
            />,
            <Sprite
                key={1}
                url={'/images/assets/JewelSocketActiveGreen-0.3835.png'}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
                onClick={this.handleClick}
            />
        ];
    }
}