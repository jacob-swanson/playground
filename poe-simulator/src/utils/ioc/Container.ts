import 'reflect-metadata';
import { ComponentRegistry } from './ComponentRegistery';
import { ComponentMetadata } from './ComponentMetadata';
import { LoggerFactory } from '../logger/LoggerFactory';

interface ComponentInstance<T = {}> extends ComponentMetadata {
    instance?: T;
    inProgress: boolean;
}

export class Container {
    private instances: ComponentInstance[] = [];
    private log = LoggerFactory.forClass(this);

    constructor(instances: ComponentInstance[]) {
        this.instances = instances;
    }

    public static fromRegistry() {
        const instances = ComponentRegistry.instance.metadata.map(it => {
            return {...it, inProgress: false};
        });
        return new Container(instances);
    }

    getComponent<T>(target: Function, name?: string): T {
        const liveComponents = this.getComponents(target, name);
        if (liveComponents.length !== 1) {
            throw new Error(`A single component was not found for "${target.name}" with name "${name}"`);
        }
        return liveComponents[0] as T;
    }

    getComponents<T>(target: Function, name?: string): T[] {
        return this.instances.filter(component => {
            const matchesTarget = component.constructor === target || component.parentConstructors.includes(target);
            const matchesName = name ? component.name === name : true;
            return matchesTarget && matchesName;
        }).map(component => {
            return this.prepareInstance(component);
        });
    }

    private prepareInstance(component: ComponentInstance) {
        if (component.inProgress) {
            throw new Error(`Circular reference detected for ${component.constructor.name}`);
        }
        if (component.instance) {
            return;
        }

        component.inProgress = true;
        this.log.debug(`Constructing ${component.constructor.name}`);
        const args = component.constructorArgs.map(parameter => this.getComponent(parameter.type, parameter.name));
        const instance = Object.create(component.constructor.prototype);
        instance.constructor.apply(instance, args);
        component.injectedParameters.forEach(it => {
            instance[it.propertyKey] = this.getComponent(it.type, it.name);
        });

        if (component.scope === 'singleton') {
            component.instance = instance;
        }
        component.inProgress = false;

        return instance;
    }
}