import { Json } from '../Json';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'trace';

export abstract class Logger {
    abstract log(level: LogLevel, message: string, ...context: Json[]): void;

    debug(message: string, ...context: any[]) {
        this.log('debug', message, ...context);
    }

    info(message: string, ...context: any[]) {
        this.log('info', message, ...context);
    }

    warn(message: string, ...context: any[]) {
        this.log('warn', message, ...context);
    }

    error(message: string, ...context: any[]) {
        this.log('error', message, ...context);
    }

    trace(message: string, ...context: any[]) {
        this.log('trace', message, ...context);
    }
}
