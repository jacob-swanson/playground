import * as React from 'react';
import { PixiRenderer } from '../PixiRenderer';
import { NullLogger } from '../../utils/logger/NullLogger';
import InteractionManager = PIXI.interaction.InteractionManager;
import { ConsoleLogger } from '../../utils/logger/ConsoleLogger';

const log = new NullLogger('PixiStage');

export interface StageProps {
    width?: number
    height?: number
    backgroundColor?: number
    onWheel?: any
    scale?: number
    draggable?: boolean
    zoomable?: boolean
}

export class PixiStage extends React.Component<StageProps> {
    private canvas: HTMLCanvasElement | null = null;
    private app: PIXI.Application | null = null;
    private mountNode = null;

    private isDragging = false;
    private prevX = 0;
    private prevY = 0;
    private distancedMoved = 0;
    private target: any = null;

    private onMouseDown = (e: any) => {
        log.trace('PixiStage.onMouseDown', e);
        this.isDragging = true;
        this.prevX = e.data.global.x;
        this.prevY = e.data.global.y;
        this.distancedMoved = 0;
        if (e.target) {
            this.target = e.target;
        }
    };

    private onMouseUp = (e: any) => {
        log.trace('PixiStage.onMouseUp', e);
        this.isDragging = false;
        if (this.target) {
            this.target.interactive = true;
            this.target = null;
        }
    };

    private onWheel = (e: any) => {
        if (!this.app) {
            return;
        }
        e.preventDefault();
        const scale = this.app.stage.scale;
        const delta = e.deltaY || e.wheelDelta;
        if (delta < 0) {
            this.app.stage.scale = new PIXI.Point(scale.x * 1.5, scale.y * 1.5);
        } else {
            this.app.stage.scale = new PIXI.Point(scale.x / 1.5, scale.y / 1.5);
        }
    };

    private onMouseMove = (e: any) => {
        if (!this.isDragging || this.app == null) {
            return;
        }

        const dx = e.data.global.x - this.prevX;
        const dy = e.data.global.y - this.prevY;

        this.distancedMoved += Math.abs(dx) + Math.abs(dy);

        this.app.stage.x += dx;
        this.app.stage.y += dy;

        this.prevX = e.data.global.x;
        this.prevY = e.data.global.y;

        if (this.target && this.distancedMoved > 5) {
            this.target.interactive = false;
        }
    };

    componentDidMount(): void {
        const {children, width, height, backgroundColor, draggable} = this.props;

        if (!this.canvas) {
            log.warn('Canvas was null');
            return;
        }

        const pixiOptions = {
            width,
            height,
            backgroundColor,
            view: this.canvas
        };
        this.app = new PIXI.Application(pixiOptions);
        this.mountNode = PixiRenderer.createContainer(this.app.stage);
        PixiRenderer.updateContainer(children, this.mountNode, this);
        PixiRenderer.injectIntoDevTools({
            findFiberByHostInstance: PixiRenderer.findFiberByHostInstance,
            bundleType: 1,
            version: '0.0.1',
            rendererPackageName: 'react-pixi'
        });

        this.app.renderer.plugins.interaction.on('mousedown', this.onMouseDown);
        this.app.renderer.plugins.interaction.on('pointerup', this.onMouseUp);
        this.app.renderer.plugins.interaction.on('mousemove', this.onMouseMove);
    }

    componentDidUpdate(prevProps: StageProps, prevState: {}) {
        const {width, height, scale} = this.props;

        if (!this.app) {
            return;
        }

        this.app.stage.scale = new PIXI.Point(scale, scale);

        if ((height && width) &&
            (width !== prevProps.width || height !== prevProps.height)) {
            this.app.renderer.resize(width, height);
        }
    }


    componentWillUnmount(): void {
        PixiRenderer.updateContainer(null, this.mountNode, this);
    }

    render() {
        const {
            width,
            height,
        } = this.props;
        return (
            <canvas
                ref={ref => this.canvas = ref}
                width={width}
                height={height}
                onWheel={this.onWheel}
            />
        );
    }
}