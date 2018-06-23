"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.indent = function (value, indent) {
        if (indent === void 0) { indent = '    '; }
        return value.replace(/^(?=.)/gm, indent);
    };
    StringUtils.padStart = function (value, targetLength, padString) {
        if (padString === void 0) { padString = ' '; }
        if (value.length > targetLength) {
            return value;
        }
        else {
            targetLength = targetLength - value.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + value;
        }
    };
    StringUtils.padEnd = function (value, targetLength, padString) {
        if (padString === void 0) { padString = ' '; }
        if (value.length > targetLength) {
            return value;
        }
        else {
            targetLength = targetLength - value.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return value + padString.slice(0, targetLength);
        }
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
