export declare type RequestMethod = 'get' | 'put' | 'post' | 'delete';
export declare class HttpRequest {
    readonly method: RequestMethod;
    readonly url: string;
    constructor(method: RequestMethod, url: string);
}
