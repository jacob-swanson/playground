"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    debug(message, ...context) {
        this.log('debug', message, ...context);
    }
    info(message, ...context) {
        this.log('info', message, ...context);
    }
    warn(message, ...context) {
        this.log('warn', message, ...context);
    }
    error(message, ...context) {
        this.log('error', message, ...context);
    }
    trace(message, ...context) {
        this.log('trace', message, ...context);
    }
}
exports.Logger = Logger;
