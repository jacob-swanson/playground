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
var NullLogger = /** @class */ (function (_super) {
    __extends(NullLogger, _super);
    function NullLogger(tag) {
        return _super.call(this) || this;
    }
    NullLogger.prototype.log = function (level, message) {
        var context = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            context[_i - 2] = arguments[_i];
        }
    };
    return NullLogger;
}(Logger_1.Logger));
exports.NullLogger = NullLogger;
