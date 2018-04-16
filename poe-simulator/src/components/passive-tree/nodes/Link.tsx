import * as React from 'react';
import { NodeModel } from './NodeFactory';
import { Line, Sprite } from '../../../pixi/PixiRenderer';
import { Point } from '../../../pixi/components/PixiLine';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

export interface LinkProps {
    from: Point;
    to: Point;
    node1: NodeModel;
    node2: NodeModel;
}

@observer
export class Link extends React.Component<LinkProps> {
    @computed
    private get color() {
        if (this.props.node1.allocated && this.props.node2.allocated) {
            return 0xD0BA5B
        } else if (this.props.node1.allocated || this.props.node2.allocated) {
            return 0x91A0BB
        } else {
            return 0x677CA1
        }
    }

    render() {
        const {from, to} = this.props;
        return (
            <Line from={from} to={to} width={10} color={this.color}/>
        )
    }
}