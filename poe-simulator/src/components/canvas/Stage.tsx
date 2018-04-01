import React = require('react');
import { LoggerFactory } from '../../utils/logger/LoggerFactory';
import { PixiStage as PixiStage } from '../../pixi/PixiStage';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const log = LoggerFactory.byName('Stage');

export interface StageProps {
    width?: number;
    height?: number;
    zoomable?: boolean;
    draggable?: boolean;
}

@observer
export class Stage extends React.Component<StageProps> {
    @observable private scale = 1;
    @observable private isDragging = false;
    @observable private previousMousePosition = {x: 0, y: 0};
    @observable private position = {x: 0, y: 0};

    private stage: PixiStage | null = null;

    componentDidMount() {
        if (!this.stage) {
            return;
        }
        const node = ReactDOM.findDOMNode(this.stage);
        node.addEventListener('mousewheel', this.onContentWheel);
    }

    componentWillUnmount() {
        if (!this.stage) {
            return;
        }
        const node = ReactDOM.findDOMNode(this.stage);
        node.removeEventListener('mousewheel', this.onContentWheel);
    }

    onContentWheel = (e: any) => {
        const delta = e.deltaY || e.wheelDelta;
        this.scale = delta > 0 ? this.scale * 1.5 : this.scale / 1.5;
    };

    onMouseDown = (e: any) => {
        this.isDragging = true;
    };

    onMouseUp = (e: any) => {
        this.isDragging = false;
    };

    onMouseMove = (e: any) => {

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
                    backgroundColor={0x1099bb}
                    // scale={scale}
                    // x={this.position.x}
                    // y={this.position.y}
                    // interactive={true}
                >
                    {this.props.children}
                </PixiStage>
            </div>
        );
    }
}