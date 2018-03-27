import { WriteStream } from 'fs';
import { LoggerFactory } from '../../logger/LoggerFactory';
import { IncomingMessage } from 'http';
import { HttpResponse } from '../HttpResponse';

export class NodeHttpResponse implements HttpResponse {
    private log = LoggerFactory.forClass(NodeHttpResponse);
    private response: IncomingMessage;

    constructor(response: IncomingMessage) {
        this.response = response;
    }

    async pipe(destination: WriteStream): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.log.debug('Piping response to file');
            this.response.pipe(destination);
            destination.on('finish', () => {
                this.log.debug('Finished piping response to file');
                resolve();
            });
        });
    }

    async json<T>(): Promise<T> {
        this.log.debug('Getting response as JSON');
        const buffer = await this.buffer();
        this.log.debug('Parsing buffer JSON');
        return JSON.parse(buffer.toString());
    }

    async buffer(): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            this.log.debug('Buffering response');
            const buffer: Buffer[] = [];
            this.response.on('data', (chunk: Buffer) => {
                this.log.debug('Received buffer chunk');
                buffer.push(chunk);
            });
            this.response.on('end', () => {
                this.log.debug('Concatenating buffers');
                resolve(Buffer.concat(buffer));
            });
        });
    }
}
