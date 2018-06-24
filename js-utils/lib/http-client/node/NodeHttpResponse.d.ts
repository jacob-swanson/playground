/// <reference types="node" />
import { WriteStream } from 'fs';
import { IncomingMessage } from 'http';
import { HttpResponse } from '../HttpResponse';
export declare class NodeHttpResponse implements HttpResponse {
    private log;
    private response;
    constructor(response: IncomingMessage);
    pipe(destination: WriteStream): Promise<void>;
    json<T>(): Promise<T>;
    buffer(): Promise<Buffer>;
}
