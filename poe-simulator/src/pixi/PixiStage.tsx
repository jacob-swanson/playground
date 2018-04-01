import * as React from 'react';
import { PixiRenderer } from './PixiRenderer';
import { LoggerFactory } from '../utils/logger/LoggerFactory';

const log = LoggerFactory.byName('PixiStage');

export interface StageProps {
    width?: number
    height?: number,
    backgroundColor?: number;
}

export class PixiStage extends React.Component<StageProps> {
    private canvas: HTMLCanvasElement | null = null;
    private app: PIXI.Application | null = null;
    private mountNode = null;

    componentDidMount(): void {
        const {children, width, height, backgroundColor} = this.props;

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
    }

    componentDidUpdate(prevProps: StageProps, prevState: {}) {
        const {width, height} = this.props;

        if (!this.app) {
            return;
        }

        if ((height && width) &&
            (width !== prevProps.width || height !== prevProps.height)) {
            this.app.renderer.resize(width, height);
        }
    }


    componentWillUnmount(): void {
        PixiRenderer.updateContainer(null, this.mountNode, this);
    }

    render() {
        const {width, height} = this.props;
        return <canvas
            ref={ref => this.canvas = ref}
            width={width}
            height={height}
        />;
    }
}