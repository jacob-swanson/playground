import * as React from 'react';
import { KeystoneNodeProps } from './KeystoneNode';
import { loadTexture } from '../SkillSpriteLoader';
import { Sprite } from '../../../pixi/PixiRenderer';
import { SkillSpriteGroups } from '../json/SkillSpritesJson';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import forEach = require('lodash/fp/forEach');
import * as _ from 'lodash';
import { ObservableArray } from 'mobx/lib/types/observablearray';
import { NodeModel } from './NodeFactory';

export interface AllocatableNodeProps {
    x: number;
    y: number;
    spritePath: string;
    type: 'keystone' | 'notable' | 'normal';
    stateStore: NodeModel
}

const spriteGroup = {
    allocated: {
        keystone: 'keystoneActive',
        notable: 'notableActive',
        normal: 'normalActive'
    },
    unallocated: {
        keystone: 'keystoneInactive',
        notable: 'notableInactive',
        normal: 'normalInactive'
    }
};

const frameUrls = {
    allocated: {
        keystone: '/images/assets/KeystoneFrameAllocated-0.3835.png',
        notable: '/images/assets/NotableFrameAllocated-0.3835.png',
        normal: '/images/assets/PSSkillFrameActive-0.3835.png',
    },
    unallocated: {
        keystone: '/images/assets/KeystoneFrameUnallocated-0.3835.png',
        notable: '/images/assets/NotableFrameUnallocated-0.3835.png',
        normal: '/images/assets/PSSkillFrame-0.3835.png',
    },
    highlighted: {
        keystone: '/images/assets/KeystoneFrameCanAllocate-0.3835.png',
        notable: '/images/assets/NotableFrameCanAllocate-0.3835.png',
        normal: '/images/assets/PSSkillFrameHighlighted-0.3835.png',
    }
};

@observer
export class AllocatableNode extends React.Component<AllocatableNodeProps> {
    handleClick = () => {
        const {stateStore} = this.props;
        stateStore.allocated = !stateStore.allocated;
    };

    render() {
        const {x, y, spritePath, type, stateStore} = this.props;
        let iconType = stateStore.allocated ? 'allocated' : 'unallocated';
        const iconTexture = loadTexture(spritePath, spriteGroup[iconType][type] as any);
        let frameType = stateStore.allocated ? 'allocated' : 'unallocated';
        if (!stateStore.allocated && stateStore.canAllocate) {
            frameType = 'highlighted';
        }
        const frameUrl = frameUrls[frameType][type];
        return [
            <Sprite
                key={1}
                texture={iconTexture}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
                onClick={this.handleClick}
            />,
            <Sprite
                key={2}
                url={frameUrl}
                x={x}
                y={y}
                anchorX={0.5}
                anchorY={0.5}
            />
        ];
    }
}