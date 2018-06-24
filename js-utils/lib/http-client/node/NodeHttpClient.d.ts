import { HttpClient } from '../HttpClient';
import { HttpRequest } from '../HttpRequest';
import { NodeHttpResponse } from './NodeHttpResponse';
export declare class NodeHttpClient extends HttpClient<NodeHttpResponse> {
    private log;
    execute(request: HttpRequest): Promise<NodeHttpResponse>;
}
