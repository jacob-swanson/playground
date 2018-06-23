import { ConsoleLogger } from './ConsoleLogger';

export class LoggerFactory {
    private constructor() {
    }

    public static forClass(object: Object) {
        return new ConsoleLogger(object.constructor.name);
    }

    public static byName(tag: string) {
        return new ConsoleLogger(tag);
    }
}