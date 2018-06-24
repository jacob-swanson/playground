"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringUtils_1 = require("./StringUtils");
it('StringUtils.indent', () => {
    expect(StringUtils_1.StringUtils.indent('text')).toEqual('    text');
});
it('StringUtils.padStart', () => {
    expect(StringUtils_1.StringUtils.padStart('text', 5)).toEqual(' text');
    expect(StringUtils_1.StringUtils.padStart('text', 4)).toEqual('text');
    expect(StringUtils_1.StringUtils.padStart('text', 3)).toEqual('text');
});
it('StringUtils.padEnd', () => {
    expect(StringUtils_1.StringUtils.padEnd('text', 5)).toEqual('text ');
    expect(StringUtils_1.StringUtils.padEnd('text', 4)).toEqual('text');
    expect(StringUtils_1.StringUtils.padEnd('text', 3)).toEqual('text');
});
