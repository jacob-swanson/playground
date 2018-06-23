import { Logger, LogLevel } from './Logger';
import { Json } from '../Json';
export declare class ConsoleLogger extends Logger {
    protected readonly tag: string;
    constructor(tag: string);
    log(level: LogLevel, message: string, ...context: Json[]): void;
}
