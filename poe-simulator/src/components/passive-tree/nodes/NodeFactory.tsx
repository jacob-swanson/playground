import * as React from 'react';
import { Filters } from '../../../utils/Filters';
import { GroupJson } from '../json/GroupJson';
import { NodeJson, NodeJsonMap } from '../json/NodeJson';
import { PassiveTreeJson } from '../json/PassiveTreeJson';
import { MasteryNode } from './MasteryNode';
import * as _ from 'lodash';
import { AllocatableNode } from './AllocatableNode';
import { computed, observable } from 'mobx';
import { Link } from './Link';

const json: PassiveTreeJson = require('../3.1.4.json');

export class NodeModel {
    @observable allocated: boolean = false;

    neighbors: NodeModel[] = [];

    @computed get canAllocate() {
        return !!this.neighbors.find(node => node.allocated);
    }
}

export namespace NodeFactory {
    const nodesPerOrbit: number[] = json.constants.skillsPerOrbit;
    const orbitRadii: number[] = json.constants.orbitRadii;

    function getNodeCoords(node: NodeJson, group: GroupJson) {
        const r = orbitRadii[node.o];
        let theta = 2 * Math.PI * node.oidx / nodesPerOrbit[node.o];
        theta -= Math.PI / 2;

        let x = r * Math.cos(theta) + group.x;
        let y = r * Math.sin(theta) + group.y;
        x *= 0.3835;
        y *= 0.3835;

        return {x, y};
    }

    function buildNode(node: NodeJson, group: GroupJson, model: NodeModel): JSX.Element {
        const r = orbitRadii[node.o];
        let theta = 2 * Math.PI * node.oidx / nodesPerOrbit[node.o];
        theta -= Math.PI / 2;

        let x = r * Math.cos(theta) + group.x;
        let y = r * Math.sin(theta) + group.y;
        x *= 0.3835;
        y *= 0.3835;

        if (node.m) {
            return <MasteryNode key={node.id} x={x} y={y} spritePath={node.icon}/>
        } else if (node.ks) {
            return <AllocatableNode
                key={node.id}
                x={x}
                y={y}
                spritePath={node.icon}
                type={'keystone'}
                stateStore={model}
            />
        } else if (node.not) {
            return <AllocatableNode
                key={node.id}
                x={x}
                y={y}
                spritePath={node.icon}
                type={'notable'}
                stateStore={model}
            />
        } else {
            return <AllocatableNode
                key={node.id}
                x={x}
                y={y}
                spritePath={node.icon}
                type={'normal'}
                stateStore={model}
            />
        }
    }

    export function build(nodes: NodeJsonMap, groups: { [key: string]: GroupJson }): JSX.Element[] {
        const idToModel = _.chain(nodes).mapValues(node => new NodeModel()).value();
        const linkElements: JSX.Element[] = [];
        _.values(nodes).forEach(node => {
            const model = idToModel[node.id];
            node.out.forEach(id => {
                const neighborModel = idToModel[id];
                model.neighbors.push(neighborModel);
                neighborModel.neighbors.push(model);

                if (node.ascendancyName && !nodes[id].ascendancyName ||
                    !node.ascendancyName && nodes[id].ascendancyName) {
                    return;
                }

                const from = getNodeCoords(node, groups[node.g]);
                const to = getNodeCoords(nodes[id], groups[nodes[id].g]);
                const key = `${node.id}-${id}`;
                linkElements.push(<Link key={key} from={from} to={to} node1={model} node2={neighborModel}/>)
            })
        });
        const nodeElements: JSX.Element[] = _.chain(nodes).values().map(node => buildNode(node, groups[node.g], idToModel[node.id])).value();
        return [...linkElements, ...nodeElements];
    }

}