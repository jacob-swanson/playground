export interface PixiRenderable<T = {}> {
    updateProps(oldProps: T, newProps: T): void;
}