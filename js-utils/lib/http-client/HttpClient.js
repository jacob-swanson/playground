"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpRequest_1 = require("./HttpRequest");
class HttpClient {
    get(url) {
        return this.execute(new HttpRequest_1.HttpRequest('get', url));
    }
}
exports.HttpClient = HttpClient;
