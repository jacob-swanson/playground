import { Json } from '../Json';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export abstract class Logger {
    abstract log(level: LogLevel, message: string, ...context: Json[]): void;

    debug(message: string, ...context: Json[]) {
        this.log('debug', message, ...context);
    }

    info(message: string, ...context: Json[]) {
        this.log('info', message, ...context);
    }

    warn(message: string, ...context: Json[]) {
        this.log('warn', message, ...context);
    }

    error(message: string, ...context: Json[]) {
        this.log('error', message, ...context);
    }
}
