declare module 'fbjs';

declare module 'fbjs/lib/emptyObject' {

}
declare module 'fbjs/lib/invariant' {
    export default function invariant(condition: any, format: string, ...args: any[]): void;
}