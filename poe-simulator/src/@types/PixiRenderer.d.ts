import { ReactPixiSpriteProps } from '../pixi/ReactPixiSprite';
import { Types } from '../pixi/Types';

interface PropertiesMap {
    [Types.Sprite]: ReactPixiSpriteProps
}

declare global {
    namespace JSX {
        interface IntrinsicElements extends PropertiesMap {
        }
    }
}