import React = require('react');
import { PassiveTreeJson } from '../json/PassiveTreeJson';
import { Circle } from 'react-konva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as Konva from 'konva';


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
            <Circle x={x} y={y} radius={25} fill={this.color} onClick={this.handleClick} perfectDrawEnabled={false}/>
        );
    }
}