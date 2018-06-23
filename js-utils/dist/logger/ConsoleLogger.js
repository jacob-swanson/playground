"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("./Logger");
/* tslint:disable:no-console */
var ConsoleLogger = /** @class */ (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger(tag) {
        var _this = _super.call(this) || this;
        // this.tag = StringUtils.padEnd(tag.substring(0, 10), 10);
        _this.tag = tag;
        return _this;
    }
    ConsoleLogger.prototype.log = function (level, message) {
        var context = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            context[_i - 2] = arguments[_i];
        }
        var datetime = new Date().toISOString();
        var output = "[" + datetime + "] [" + this.tag + "] [" + level + "] " + message;
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
    };
    return ConsoleLogger;
}(Logger_1.Logger));
exports.ConsoleLogger = ConsoleLogger;
/* tslint:enable:no-console */
