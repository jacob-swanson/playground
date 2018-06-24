"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtils {
    constructor() {
    }
    static indent(value, indent = '    ') {
        return value.replace(/^(?=.)/gm, indent);
    }
    static padStart(value, targetLength, padString = ' ') {
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
    }
    static padEnd(value, targetLength, padString = ' ') {
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
    }
}
exports.StringUtils = StringUtils;
