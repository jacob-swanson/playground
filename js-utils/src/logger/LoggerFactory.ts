import {ConsoleLogger} from "./ConsoleLogger";

export class LoggerFactory {
    private constructor() {
    }

    public static getLogger(object: object | string) {
        if (typeof object === "string") {
            return new ConsoleLogger(object);
        }
        return new ConsoleLogger(object.constructor.name);
    }
}