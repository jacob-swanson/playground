import { Logger, LogLevel } from './Logger';
import { Json } from '../Json';

/* tslint:disable:no-console */

export class ConsoleLogger extends Logger {
    protected readonly tag: string;

    constructor(tag: string) {
        super();
        // this.tag = StringUtils.padEnd(tag.substring(0, 10), 10);
        this.tag = tag;
    }

    log(level: LogLevel, message: string, ...context: Json[]): void {
        const datetime = new Date().toISOString();
        const output = `[${datetime}] [${this.tag}] [${level}] ${message}`;
        if (Array.isArray(context) && context.length > 0) {
            if (context.length === 1) {
                console.log(output, context[0]);
            } else {
                console.log(output, context);
            }
        } else {
            console.log(output);
        }
    }
}

/* tslint:enable:no-console */
