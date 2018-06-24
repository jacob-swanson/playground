"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerFactory_1 = require("../../logger/LoggerFactory");
class NodeHttpResponse {
    constructor(response) {
        this.log = LoggerFactory_1.LoggerFactory.forClass(NodeHttpResponse);
        this.response = response;
    }
    pipe(destination) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.log.debug('Piping response to file');
                this.response.pipe(destination);
                destination.on('finish', () => {
                    this.log.debug('Finished piping response to file');
                    resolve();
                });
            });
        });
    }
    json() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.debug('Getting response as JSON');
            const buffer = yield this.buffer();
            this.log.debug('Parsing buffer JSON');
            return JSON.parse(buffer.toString());
        });
    }
    buffer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.log.debug('Buffering response');
                const buffer = [];
                this.response.on('data', (chunk) => {
                    this.log.debug('Received buffer chunk');
                    buffer.push(chunk);
                });
                this.response.on('end', () => {
                    this.log.debug('Concatenating buffers');
                    resolve(Buffer.concat(buffer));
                });
            });
        });
    }
}
exports.NodeHttpResponse = NodeHttpResponse;
