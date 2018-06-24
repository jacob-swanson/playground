"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = require("./ConsoleLogger");
class LoggerFactory {
    constructor() {
    }
    static forClass(object) {
        return new ConsoleLogger_1.ConsoleLogger(object.constructor.name);
    }
    static byName(tag) {
        return new ConsoleLogger_1.ConsoleLogger(tag);
    }
}
exports.LoggerFactory = LoggerFactory;
