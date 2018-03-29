import * as React from 'react';
import { LoggerFactory } from '../../utils/logger/LoggerFactory';
import { Vector2d } from 'konva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Character } from '../../model/Character';
import * as _ from 'lodash';
import { GroupFactory } from './groups/GroupFactory';
import { PassiveTreeJson } from './json/PassiveTreeJson';
import { NodeFactory } from './nodes/NodeFactory';
import { Stage } from '../canvas/Stage';

const json: PassiveTreeJson = require('./3.1.4.json');
const log = LoggerFactory.forClass('PassiveTree');


interface PassiveTreeProps {
    character: Character
}

@observer
export class PassiveTree extends React.Component<PassiveTreeProps> {
    private groups: JSX.Element[] = [];
    private nodes: JSX.Element[] = [];


    componentWillMount() {
        this.groups = GroupFactory.build(_.values(json.groups));
        this.nodes = NodeFactory.build(json.nodes, json.groups);
    }

    render() {
        return (
            <Stage draggable={true} zoomable={true}>
                {this.groups}
            </Stage>
        );
    }
}