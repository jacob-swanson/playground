import { ReactPixiSpriteProps } from '../pixi/components/ReactPixiSprite';
import { Types } from '../pixi/Types';
import { PixiLineProps } from '../pixi/components/PixiLine';

interface PropertiesMap {
    [Types.Sprite]: ReactPixiSpriteProps
    [Types.Line]: PixiLineProps
}

declare global {
    namespace JSX {
        interface IntrinsicElements extends PropertiesMap {
        }
    }
}