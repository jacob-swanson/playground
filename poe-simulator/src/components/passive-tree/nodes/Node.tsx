import React = require('react');
import { observer } from 'mobx-react';
import { Sprite } from '../../../pixi/PixiRenderer';

export interface AbstractNodeProps {
    x: number;
    y: number;
    frameUrl: string;
    icon: PIXI.Texture;
}


export interface NodeProps {
    x: number;
    y: number;
}

@observer
export class Node extends React.Component<AbstractNodeProps> {
    handleClick = (e: any) => {
        console.log('Node!', e);
    };

    render() {
        const {x, y, frameUrl, icon} = this.props;
        return [
            <Sprite
                key={0}
                url={frameUrl}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
            />,
            <Sprite
                key={1}
                texture={icon}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
                onClick={this.handleClick}
            />
        ];
    }
}