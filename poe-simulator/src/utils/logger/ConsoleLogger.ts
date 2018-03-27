import { Logger, LogLevel } from './Logger';
import { StringUtils } from '../StringUtils';
import { Json } from '../Json';

/* tslint:disable:no-console */

export class ConsoleLogger extends Logger {
    private tag: string;

    constructor(tag: string) {
        super();
        this.tag = StringUtils.padEnd(tag.substring(0, 15), 15);
    }

    log(level: LogLevel, message: string, ...context: Json[]): void {
        const datetime = new Date().toISOString();
        const levelString = StringUtils.padEnd(
            level
                .toUpperCase()
                .substr(0, 4),
            4
        );
        const output = `[${datetime}] [${this.tag}] [${levelString}] ${message}`;
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
