import {Json} from "../Json";
import {LogLevel} from "./LogLevel";

export abstract class Logger {
    public abstract log(level: LogLevel, message: string, ...context: Json[]): void;

    public debug(message: string, ...context: any[]) {
        this.log("debug", message, ...context);
    }

    public info(message: string, ...context: any[]) {
        this.log("info", message, ...context);
    }

    public warn(message: string, ...context: any[]) {
        this.log("warn", message, ...context);
    }

    public error(message: string, ...context: any[]) {
        this.log("error", message, ...context);
    }

    public trace(message: string, ...context: any[]) {
        this.log("trace", message, ...context);
    }
}
