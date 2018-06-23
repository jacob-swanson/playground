import * as React from 'react';
import { LoggerFactory } from '../../utils/logger/LoggerFactory';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import { GroupFactory } from './groups/GroupFactory';
import { PassiveTreeJson } from './json/PassiveTreeJson';
import { PixiStage } from '../../pixi/components/PixiStage';
import { observable } from 'mobx';
import { NodeFactory } from './nodes/NodeFactory';
import './PassiveTree.css';

const json: PassiveTreeJson = require('./3.1.4.json');
const log = LoggerFactory.byName('PassiveTree');

interface PassiveTreeProps {
}

@observer
export class PassiveTree extends React.Component<PassiveTreeProps> {
    @observable private scale = 1;
    private div: HTMLDivElement | null;

    @observable private width = 1280;
    @observable private height = 720;

    onResize = () => {
        if (!this.div) {
            return;
        }
        this.width = this.div.clientWidth;
        this.height = this.div.clientHeight;

        log.debug('Resized to', this.width, this.height);
    };

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    render() {
        return (
            <div ref={ref => this.div = ref} className="PassiveTree">
                <PixiStage
                    width={this.width}
                    height={this.height}
                    backgroundColor={0x1099bb}
                    scale={this.scale}
                    draggable={true}
                    zoomable={true}
                >
                    {GroupFactory.build(_.values(json.groups))}
                    {NodeFactory.build(json.nodes, json.groups)}
                </PixiStage>
            </div>
        );
    }
}