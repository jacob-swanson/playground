import * as React from 'react';
import { SmallGroup } from './SmallGroup';
import { LargeGroup } from './LargeGroup';
import { MediumGroup } from './MediumGroup';
import { Filters } from '../../../utils/Filters';
import { GroupJson } from '../json/GroupJson';

export namespace GroupFactory {
    const groupCache = {};
    function buildGroup(json: GroupJson, index: number): JSX.Element | null {
        const x = json.x * 0.3835;
        const y = json.y * 0.3835;
        if (json.oo[3]) {
            return <LargeGroup key={index} x={x} y={y}/>;
        } else if (json.oo[2]) {
            return <MediumGroup key={index} x={x} y={y}/>;
        } else if (json.oo[1]) {
            return <SmallGroup key={index} x={x} y={y}/>;
        }
        return null;
    }

    export function build(groups: GroupJson[]): JSX.Element[] {
        return groups
            .map(buildGroup)
            .filter(Filters.notEmpty);
    }
}
