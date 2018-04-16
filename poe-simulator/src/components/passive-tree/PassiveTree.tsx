import * as React from 'react';
import { LoggerFactory } from '../../utils/logger/LoggerFactory';
import { observer } from 'mobx-react';
import { Character } from '../../model/Character';
import * as _ from 'lodash';
import { GroupFactory } from './groups/GroupFactory';
import { PassiveTreeJson } from './json/PassiveTreeJson';
import { LargeGroup } from './groups/LargeGroup';
import { PixiStage } from '../../pixi/components/PixiStage';
import { observable } from 'mobx';
import { NodeFactory } from './nodes/NodeFactory';


const json: PassiveTreeJson = require('./3.1.4.json');
const log = LoggerFactory.byName('PassiveTree');

interface PassiveTreeProps {
    character: Character
}

@observer
export class PassiveTree extends React.Component<PassiveTreeProps> {
    @observable private scale = 1;

    render() {
        return (
            <PixiStage
                width={window.innerWidth}
                height={window.innerHeight}
                backgroundColor={0x1099bb}
                scale={this.scale}
                draggable={true}
                zoomable={true}
            >
                {GroupFactory.build(_.values(json.groups))}
                {NodeFactory.build(json.nodes, json.groups)}
            </PixiStage>
        );
    }
}