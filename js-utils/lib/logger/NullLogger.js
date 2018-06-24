"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
class NullLogger extends Logger_1.Logger {
    constructor(tag) {
        super();
    }
    log(level, message, ...context) {
    }
}
exports.NullLogger = NullLogger;
