import { Logger, LogLevel } from './Logger';
import { StringUtils } from '../StringUtils';
import { Json } from '../Json';

export class NullLogger extends Logger {
    constructor(tag?: string) {
        super();
    }

    log(level: LogLevel, message: string, ...context: Json[]): void {
    }
}
