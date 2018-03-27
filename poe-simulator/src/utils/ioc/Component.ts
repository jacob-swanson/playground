import { ComponentOptions } from './ComponentOptions';
import { ComponentRegistry } from './ComponentRegistery';

export function Component(options: ComponentOptions = {}) {
    return (target: Function) => {
        ComponentRegistry.instance.registerComponent(target, options);
    };
}