import { Json } from '../Json';
export declare type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'trace';
export declare abstract class Logger {
    abstract log(level: LogLevel, message: string, ...context: Json[]): void;
    debug(message: string, ...context: any[]): void;
    info(message: string, ...context: any[]): void;
    warn(message: string, ...context: any[]): void;
    error(message: string, ...context: any[]): void;
    trace(message: string, ...context: any[]): void;
}
