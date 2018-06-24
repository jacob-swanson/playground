"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("../HttpClient");
const https = __importStar(require("https"));
const url = __importStar(require("url"));
const LoggerFactory_1 = require("../../logger/LoggerFactory");
const http = __importStar(require("http"));
const NodeHttpResponse_1 = require("./NodeHttpResponse");
class NodeHttpClient extends HttpClient_1.HttpClient {
    constructor() {
        super(...arguments);
        this.log = LoggerFactory_1.LoggerFactory.forClass(NodeHttpClient);
    }
    execute(request) {
        return new Promise((resolve, reject) => {
            this.log.debug(`Executing HTTP request to ${request.url}`);
            const parsedUrl = url.parse(request.url);
            const options = Object.assign({}, parsedUrl, { method: request.method });
            const protocol = parsedUrl.protocol || 'http:';
            const isHttps = protocol === 'https:';
            const responseCallback = (response) => {
                if (!response.statusCode || response.statusCode < 200 || response.statusCode > 299) {
                    reject('Request failed');
                }
                else {
                    resolve(new NodeHttpResponse_1.NodeHttpResponse(response));
                }
            };
            const clientRequest = isHttps ?
                https.request(options, responseCallback) :
                http.request(options, responseCallback);
            clientRequest.on('error', (error) => {
                this.log.error('HTTP request failed');
                reject(error);
            });
            clientRequest.end();
        });
    }
}
exports.NodeHttpClient = NodeHttpClient;
