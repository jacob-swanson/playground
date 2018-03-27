import { InjectOptions } from './InjectOptions';
import { LoggerFactory } from '../logger/LoggerFactory';

const log = LoggerFactory.byName('Inject');

export function Inject(options: InjectOptions = {}) {
    return (target: Function | Object, propertyKey: string, parameterIndex?: number) => {
        if (target instanceof Function && parameterIndex) {
            log.debug(`Registering constructor inject for ${target.name}`);
            const data = Reflect.getOwnMetadata('container:inject', target, propertyKey) || {};
            data[parameterIndex] = options;
            Reflect.defineMetadata('container:inject', data, target);
        } else if (target instanceof Object) {
            log.debug(`Registering property inject for ${target.constructor.name}`);
            const type = Reflect.getOwnMetadata('design:type', target, propertyKey);
            const data = Reflect.getOwnMetadata('container:prop-inject', target, propertyKey) || [];
            data.push({propertyKey, type, options});
            Reflect.defineMetadata('container:prop-inject', data, target.constructor);
        }
    };
}
