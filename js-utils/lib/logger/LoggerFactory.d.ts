import { ConsoleLogger } from './ConsoleLogger';
export declare class LoggerFactory {
    private constructor();
    static forClass(object: Object): ConsoleLogger;
    static byName(tag: string): ConsoleLogger;
}
