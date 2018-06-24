"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
/* tslint:disable:no-console */
class ConsoleLogger extends Logger_1.Logger {
    constructor(tag) {
        super();
        // this.tag = StringUtils.padEnd(tag.substring(0, 10), 10);
        this.tag = tag;
    }
    log(level, message, ...context) {
        const datetime = new Date().toISOString();
        const output = `[${datetime}] [${this.tag}] [${level}] ${message}`;
        if (Array.isArray(context) && context.length > 0) {
            if (context.length === 1) {
                console.log(output, context[0]);
            }
            else {
                console.log(output, context);
            }
        }
        else {
            console.log(output);
        }
    }
}
exports.ConsoleLogger = ConsoleLogger;
/* tslint:enable:no-console */
