import * as React from 'react';
import { Stage, Layer, Text, FastLayer } from 'react-konva';
import { LoggerFactory } from '../../utils/logger/LoggerFactory';
import { Vector2d } from 'konva';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Character } from '../../model/Character';
import * as _ from 'lodash';
import { GroupFactory } from './groups/GroupFactory';
import { PassiveTreeJson } from './json/PassiveTreeJson';
import { NodeFactory } from './nodes/NodeFactory';


const json: PassiveTreeJson = require('./3.1.4.json');
const log = LoggerFactory.forClass('PassiveTree');


interface PassiveTreeProps {
    character: Character
}

@observer
export class PassiveTree extends React.Component<PassiveTreeProps> {
    @observable scale: number = 1;
    @observable position: Vector2d = {x: 0, y: 0};

    private stage: Stage | null;
    private groups: JSX.Element[] = [];
    private nodes: JSX.Element[] = [];

    onContentWheel = (e: any) => {
        if (!this.stage) {
            log.debug('No stage to scale');
            return;
        }
        const delta = e.evt.deltaY || e.evt.wheelDelta;
        const oldScale = this.scale;
        const pointerPosition = this.stage.getStage().getPointerPosition();
        const stagePosition = this.stage.getStage().getPosition();

        const mousePointsTo = {
            x: pointerPosition.x / oldScale - stagePosition.x / oldScale,
            y: pointerPosition.y / oldScale - stagePosition.y / oldScale
        };

        const scaleBy = 1.5;
        const newScale = delta < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        this.position = {
            x: -(mousePointsTo.x - pointerPosition.x / newScale) * newScale,
            y: -(mousePointsTo.y - pointerPosition.y / newScale) * newScale
        };
        this.scale = newScale;
    };

    componentWillMount() {
        this.groups = GroupFactory.build(_.values(json.groups));
        this.nodes = NodeFactory.build(json.nodes, json.groups);
    }

    render() {
        return (
            <Stage
                ref={stage => this.stage = stage}
                width={window.innerWidth}
                height={window.innerHeight}
                onContentWheel={this.onContentWheel}
                scaleX={this.scale}
                scaleY={this.scale}
                x={this.position.x}
                y={this.position.y}
                draggable={true}
            >
                <FastLayer>
                    {this.groups}
                </FastLayer>
                <Layer>
                    {this.nodes}
                </Layer>
            </Stage>
        );
    }
}