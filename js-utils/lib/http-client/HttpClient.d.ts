import { HttpResponse } from './HttpResponse';
import { HttpRequest } from './HttpRequest';
export declare abstract class HttpClient<T extends HttpResponse> {
    abstract execute(request: HttpRequest): Promise<T>;
    get(url: string): Promise<T>;
}
