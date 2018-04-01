export interface PixiRenderable<T = {}> {
    updateProps(oldProps: Partial<T>, newProps: Partial<T>): void;
}