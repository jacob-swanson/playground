import * as React from 'react';
import { LoggerFactory } from '../../utils/logger/LoggerFactory';
import { observer } from 'mobx-react';
import { Character } from '../../model/Character';
import * as _ from 'lodash';
import { GroupFactory } from './groups/GroupFactory';
import { PassiveTreeJson } from './json/PassiveTreeJson';
import { LargeGroup } from './groups/LargeGroup';
import { PixiStage as PIXIStage } from '../../pixi/PixiStage';
import { observable } from 'mobx';


const json: PassiveTreeJson = require('./3.1.4.json');
const log = LoggerFactory.byName('PassiveTree');

interface PassiveTreeProps {
    character: Character
}

@observer
export class PassiveTree extends React.Component<PassiveTreeProps> {
    render() {
        return (
            <PIXIStage width={window.innerWidth} height={window.innerHeight} backgroundColor={0x1099bb}>
                {/*{GroupFactory.build(_.values(json.groups))}*/}
                <LargeGroup x={300} y={300}/>
            </PIXIStage>
        );
    }
}