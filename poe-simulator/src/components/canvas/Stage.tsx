import React = require('react');
import { LoggerFactory } from '../../utils/logger/LoggerFactory';
import { Stage as PixiStage } from 'react-pixi-fiber';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const log = LoggerFactory.forClass('Stage');

export interface StageProps {
    width?: number;
    height?: number;
    zoomable?: boolean;
    draggable?: boolean;
}

@observer
export class Stage extends React.Component<StageProps> {
    @observable scale: number = 1;
    // @observable position: Vector2d = {x: 0, y: 0};

    private stage: PixiStage | null = null;

    componentDidMount() {
        if (!this.stage) {
            return;
        }
        const node = ReactDOM.findDOMNode(this.stage);
        node.addEventListener('mousewheel', this.onContentWheel);
    }

    onContentWheel = (e: any) => {
        const delta = e.deltaY || e.wheelDelta;
        this.scale = delta > 0 ? this.scale * 1.5 : this.scale / 1.5;
        // const oldScale = this.scale;
        // const pointerPosition = this.stage.getStage().getPointerPosition();
        // const stagePosition = this.stage.getStage().getPosition();
        //
        // const mousePointsTo = {
        //     x: pointerPosition.x / oldScale - stagePosition.x / oldScale,
        //     y: pointerPosition.y / oldScale - stagePosition.y / oldScale
        // };
        //
        // const scaleBy = 1.5;
        // const newScale = delta < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        //
        // this.position = {
        //     x: -(mousePointsTo.x - pointerPosition.x / newScale) * newScale,
        //     y: -(mousePointsTo.y - pointerPosition.y / newScale) * newScale
        // };
        // this.scale = newScale;
    };

    // onContentWheel = (e: any) => {
    //     if (!this.stage) {
    //         log.debug('No stage to scale');
    //         return;
    //     }
    //     const delta = e.evt.deltaY || e.evt.wheelDelta;
    //     const oldScale = this.scale;
    //     const pointerPosition = this.stage.getStage().getPointerPosition();
    //     const stagePosition = this.stage.getStage().getPosition();
    //
    //     const mousePointsTo = {
    //         x: pointerPosition.x / oldScale - stagePosition.x / oldScale,
    //         y: pointerPosition.y / oldScale - stagePosition.y / oldScale
    //     };
    //
    //     const scaleBy = 1.5;
    //     const newScale = delta < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    //
    //     this.position = {
    //         x: -(mousePointsTo.x - pointerPosition.x / newScale) * newScale,
    //         y: -(mousePointsTo.y - pointerPosition.y / newScale) * newScale
    //     };
    //     this.scale = newScale;
    // };

    render() {
        const scale = new PIXI.Point(this.scale, this.scale);
        return (
            <div className="Stage">
                <PixiStage
                    ref={(stage) => this.stage = stage}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    scale={scale}
                    x={1000}
                    y={600}
                >
                    {this.props.children}
                </PixiStage>
            </div>
        );
    }
}