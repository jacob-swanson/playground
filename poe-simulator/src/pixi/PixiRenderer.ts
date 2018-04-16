import * as ReactFiberReconciler from 'react-reconciler';
import { Types } from './Types';
import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { LoggerFactory } from '../utils/logger/LoggerFactory';
import { ReactPixiSprite, ReactPixiSpriteProps } from './components/ReactPixiSprite';
import { PixiRenderable } from './components/PixiRenderable';
import Container = PIXI.Container;
import DisplayObject = PIXI.DisplayObject;
import * as invariant from 'fbjs/lib/invariant';
import { emptyObject } from '../utils/emptyObject';
import { NullLogger } from '../utils/logger/NullLogger';
import { PixiLine, PixiLineProps } from './components/PixiLine';
const now = require('performance-now');

const log = new NullLogger();

type PropTypes = ReactPixiSpriteProps | PixiLineProps;
type ElementTypes = 'Sprite' | 'Line';

function appendChild(parentInstance: Container, child: DisplayObject) {
    log.trace('appendChild', {parentInstance, child});
    parentInstance.removeChild(child);
    parentInstance.addChild(child);
}


function createInstance(type: ElementTypes, props: PropTypes, internalInstanceHandle: Container): PixiRenderable {
    log.trace('createInstance', {type, props, internalInstanceHandle});
    let inst: PixiRenderable | null = null;
    switch (type) {
        case Types.Sprite:
            inst = new ReactPixiSprite();
            break;
        case Types.Line:
            inst = new PixiLine();
            break;
        default:
            throw new Error(`Type ${type} not supported`);
    }

    inst.updateProps({}, props);
    return inst;
}

function createTextInstance(text: string, rootContainerInstance: Container, internalInstanceHandle: any) {
    log.trace('createTextInstance', {text, rootContainerInstance, internalInstanceHandle});
    throw new Error('PixiRenderer does not support text instances');
}

function finalizeInitialChildren(pixiElement: PixiRenderable, type: ElementTypes, props: PropTypes, rootContainerInstance: Container): boolean {
    log.trace('finalizeInitialChildren', {pixiElement, type, props, rootContainerInstance});
    return false;
}

function getChildHostContext(parentHostContext: any, type: ElementTypes): any {
    log.trace('getChildHostContext', {parentHostContext, type});
    return emptyObject;
}

/**
 *
 * @param rootContainerInstance
 */
function getRootHostContext(rootContainerInstance: Container): any {
    log.trace('getRootHostContext', {rootContainerInstance});
    return emptyObject;
}

function getPublicInstance(inst: PixiRenderable): PixiRenderable {
    log.trace('getPublicInstance', {inst});
    return inst;
}

function prepareForCommit(): void {
    log.trace('prepareForCommit', {});
}

function prepareUpdate(pixiElement: PixiRenderable, type: Types, oldProps: PropTypes, newProps: PropTypes, rootContainerInstance: Container, hostContext: any) {
    log.trace('prepareUpdate', {pixiElement, type, oldProps, newProps, rootContainerInstance, hostContext});
    return diffProps(pixiElement, type, oldProps, newProps, rootContainerInstance);
}

function diffProps(pixiElement: any, type: any, lastRawProps: any, nextRawProps: any, rootContainerElement: any) {
    log.trace('diffProps', {pixiElement, type, lastRawProps, nextRawProps, rootContainerElement});
    let updatePayload: any[] | null = null;

    let lastProps = lastRawProps;
    let nextProps = nextRawProps;
    let propKey;

    for (propKey of _.keys(lastProps)) {
        if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
            continue;
        }
        if (propKey === 'children') {
            // Noop. Text children not supported
        } else {
            // For all other deleted properties we add it to the queue. We use
            // the whitelist in the commit phase instead.
            updatePayload = updatePayload || [];
            updatePayload.push(propKey, null);
        }
    }
    for (propKey of _.keys(nextProps)) {
        const nextProp = nextProps[propKey];
        const lastProp = lastProps != null ? lastProps[propKey] : undefined;
        if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || (nextProp == null && lastProp == null)) {
            continue;
        }
        if (propKey === 'children') {
            // Noop. Text children not supported
        } else {
            // For any other property we always add it to the queue and then we
            // filter it out using the whitelist during the commit.
            updatePayload = updatePayload || [];
            updatePayload.push(propKey, nextProp);
        }
    }
    log.trace('diffProps Result', {updatePayload});
    return updatePayload;
}

function resetAfterCommit() {
    log.trace('resetAfterCommit');
}

function resetTextContent(pixiElement: any): void {
    log.trace('resetTextContent', {pixiElement});
}

function shouldDeprioritizeSubtree(type: any, props: any) {
    log.trace('shouldDeprioritizeSubtree', {type, props});
    return false;
}

function shouldSetTextContent(type: any, props: any) {
    log.trace('shouldSetTextContent', {type, props});
    return false;
}

function commitMount(instance: any, type: any, newProps: any) {
    log.trace('commitMount', {instance, type, newProps});
}

function commitTextUpdate(textInstance: any, oldText: any, newText: any) {
    log.trace('commitTextUpdate', {textInstance, oldText, newText});
}

const including = (props: any) => (key: any) => props.indexOf(key) !== -1;

function filterByKey(inputObject: any, filter: any) {
    const exportObject = {};

    Object.keys(inputObject)
        .filter(filter)
        .forEach(key => {
            exportObject[key] = inputObject[key];
        });

    return exportObject;
}

function commitUpdate(instance: any, updatePayload: any, type: any, oldProps: any, nextProps: any, internalInstanceHandle: any) {
    log.trace('commitUpdate', {instance, updatePayload, type, oldProps, nextProps, internalInstanceHandle});
    // updatePayload is in the form of [propKey1, propValue1, ...]
    // const updatedPropKeys = including(updatePayload.filter((item: any, i: number) => i % 2 === 0));
    // const oldProps = filterByKey(oldProps, updatedPropKeys);
    // const newProps = filterByKey(nextProps, updatedPropKeys);

    // regular components only receive props that have changed
    instance.updateProps(oldProps, nextProps);
}

function insertBefore(parentInstance: any, child: any, beforeChild: any) {
    log.trace('insertBefore', parentInstance, child, beforeChild);
    const childExists = parentInstance.children.indexOf(child) !== -1;
    const index = parentInstance.getChildIndex(beforeChild);
    if (childExists) {
        parentInstance.setChildIndex(child, index);
    } else {
        parentInstance.addChildAt(child, index);
    }
}

function removeChild(parentInstance: any, child: any) {
    log.trace('removeChild', parentInstance, child);
    parentInstance.removeChild(child);
    child.destroy();
}

const PixiRenderer = ReactFiberReconciler({
    appendInitialChild: appendChild,
    createInstance: createInstance,
    createTextInstance: createTextInstance,
    finalizeInitialChildren: finalizeInitialChildren,
    getChildHostContext: getChildHostContext,
    getRootHostContext: getRootHostContext,
    getPublicInstance: getPublicInstance,
    now: now,
    prepareForCommit: prepareForCommit,
    prepareUpdate: prepareUpdate,
    resetAfterCommit: resetAfterCommit,
    resetTextContent: resetTextContent,
    shouldDeprioritizeSubtree: shouldDeprioritizeSubtree,
    shouldSetTextContent: shouldSetTextContent,
    useSyncScheduling: true,
    mutation: {
        appendChild: appendChild,
        appendChildToContainer: appendChild,
        commitMount: commitMount,
        commitTextUpdate: commitTextUpdate,
        commitUpdate: commitUpdate,
        insertBefore: insertBefore,
        insertInContainerBefore: insertBefore,
        removeChild: removeChild,
        removeChildFromContainer: removeChild,
    },
});

const Sprite: Types.Sprite = Types.Sprite;
const Line: Types.Line = Types.Line;

export {
    PixiRenderer,
    Sprite,
    Line
}