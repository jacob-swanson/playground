"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.debug = function (message) {
        var context = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            context[_i - 1] = arguments[_i];
        }
        this.log.apply(this, ['debug', message].concat(context));
    };
    Logger.prototype.info = function (message) {
        var context = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            context[_i - 1] = arguments[_i];
        }
        this.log.apply(this, ['info', message].concat(context));
    };
    Logger.prototype.warn = function (message) {
        var context = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            context[_i - 1] = arguments[_i];
        }
        this.log.apply(this, ['warn', message].concat(context));
    };
    Logger.prototype.error = function (message) {
        var context = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            context[_i - 1] = arguments[_i];
        }
        this.log.apply(this, ['error', message].concat(context));
    };
    Logger.prototype.trace = function (message) {
        var context = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            context[_i - 1] = arguments[_i];
        }
        this.log.apply(this, ['trace', message].concat(context));
    };
    return Logger;
}());
exports.Logger = Logger;
