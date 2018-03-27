import { InjectOptions } from './InjectOptions';
import { ComponentOptions } from './ComponentOptions';
import { ComponentMetadata } from './ComponentMetadata';
import { LoggerFactory } from '../logger/LoggerFactory';

export class ComponentRegistry {
    private static _instance: ComponentRegistry;
    private _metadata: ComponentMetadata[] = [];
    private log = LoggerFactory.forClass(this);

    private constructor() {
    }

    public static get instance() {
        if (!ComponentRegistry._instance) {
            ComponentRegistry._instance = new ComponentRegistry();
        }

        return ComponentRegistry._instance;
    }

    public get metadata() {
        return this._metadata;
    }

    registerComponent(constructor: Function, options: ComponentOptions) {
        this.log.debug(`Registering component ${constructor.name}`);
        const parameterTypes: Function[] = Reflect.getMetadata('design:paramtypes', constructor) || [];
        const injectOptions: {[key: string]: InjectOptions} = Reflect.getOwnMetadata('container:inject', constructor) || {};
        const propInjectOptions: {propertyKey: string, type: Function, options: InjectOptions}[] = Reflect.getOwnMetadata('container:prop-inject', constructor) || [];

        const constructorArgs = parameterTypes.map((it, index) => {
            const injectOption = injectOptions[index];
            return {
                type: it,
                name: injectOption ? injectOption.name : undefined
            };
        });
        const injectedParameters = propInjectOptions.map(it => {
            return {
                propertyKey: it.propertyKey,
                type: it.type,
                name: it.options.name
            };
        });
        const parentConstructors = ComponentRegistry.getParentConstructors(constructor);
        const scope = options.scope || 'singleton';
        const metadata: ComponentMetadata = {
            name: options.name ? options.name : '',
            constructor,
            parentConstructors,
            constructorArgs,
            scope,
            injectedParameters
        };
        this.metadata.push(metadata);
    }

    registerInject(constructor: Function, parameterIndex: number, options: InjectOptions) {
        this._metadata
            .filter(it => it.constructor === constructor)
            .forEach(it => it.constructorArgs[parameterIndex].name = options.name);
    }

    static getParentConstructors(target: Function): Function[] {
        const constructors = [];
        let constructor: Function | null = target;
        while (constructor) {
            const prototype = Object.getPrototypeOf(constructor.prototype);
            if (prototype) {
                constructor = prototype.constructor;
                constructors.push(prototype.constructor);
            } else {
                constructor = null;
            }
        }
        return constructors;
    }
}