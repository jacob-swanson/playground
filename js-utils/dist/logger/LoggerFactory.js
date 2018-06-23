"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleLogger_1 = require("./ConsoleLogger");
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    LoggerFactory.forClass = function (object) {
        return new ConsoleLogger_1.ConsoleLogger(object.constructor.name);
    };
    LoggerFactory.byName = function (tag) {
        return new ConsoleLogger_1.ConsoleLogger(tag);
    };
    return LoggerFactory;
}());
exports.LoggerFactory = LoggerFactory;
