import { Logger, LogLevel } from './Logger';
import { Json } from '../Json';
export declare class NullLogger extends Logger {
    constructor(tag?: string);
    log(level: LogLevel, message: string, ...context: Json[]): void;
}
