import { ParameterMetadata } from './ParameterMetadata';
import { ComponentScope } from './ComponentScope';

export interface PropertyInjectMetadata extends ParameterMetadata {
    propertyKey: string;
}

export interface ComponentMetadata {
    name: string;
    constructor: Function;
    parentConstructors: Function[];
    constructorArgs: ParameterMetadata[];
    injectedParameters: PropertyInjectMetadata[];
    scope: ComponentScope;
}