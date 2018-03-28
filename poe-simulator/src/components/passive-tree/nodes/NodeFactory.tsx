import * as React from 'react';
import { Filters } from '../../../utils/Filters';
import { GroupJson } from '../json/GroupJson';
import { NodeJson } from '../json/NodeJson';
import { PassiveTreeJson } from '../json/PassiveTreeJson';
import { Node } from './Node';

const json: PassiveTreeJson = require('../3.1.4.json');

export namespace NodeFactory {
    const nodesPerOrbit: number[] = json.constants.skillsPerOrbit;
    const orbitRadii: number[] = json.constants.orbitRadii;

    function buildNode(json: NodeJson, group: GroupJson): JSX.Element {
        const d = orbitRadii[json.o];
        const b = 2 * Math.PI * json.oidx / nodesPerOrbit[json.o];

        let x = d * Math.sin(-b) + group.x;
        let y = d * Math.cos(-b) + group.y;
        x *= 0.3835;
        y *= 0.3835;

        return <Node key={json.id} x={x} y={y}/>;
    }

    export function build(nodes: NodeJson[], groups: { [key: string]: GroupJson }): JSX.Element[] {
        return nodes
            .map((json) => buildNode(json, groups[json.g]));
    }

}