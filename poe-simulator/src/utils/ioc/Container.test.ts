import 'reflect-metadata';
import { Container } from './Container';
import { Component } from './Component';
import { Inject } from './Inject';

@Component({scope: 'prototype'})
class TestServiceB {
    constructor() {
    }

    hello() {
        return 'Hello';
    }
}

@Component({name: 'Test'})
class TestServiceC {
    constructor() {
    }

    world() {
        return 'world';
    }
}

@Component()
class TestServiceA {
    prop = 'test';

    constructor(readonly testServiceB: TestServiceB,
                readonly testServiceC: TestServiceC) {
    }

    hello() {
        // console.log(this.testServiceB.hello() + ' ' + this.testServiceC.world());
    }
}

@Component()
class TestServiceD {
    prop = 'test';

    constructor(readonly testServiceB: TestServiceB,
                @Inject({name: 'Test'}) readonly testServiceC: TestServiceC) {
    }

    hello() {
        // console.log(this.testServiceB.hello() + ' ' + this.testServiceC.world());
    }
}

@Component()
class TestPropInjection {
    @Inject()
    private service: TestServiceA;

    constructor() {
    }

    hello() {
        this.service.hello();
    }
}

it('ContainerImpl', () => {
    const container = Container.fromRegistry();
    // const service = container.getComponent<TestServiceA>(TestServiceA);
    // service.hello();
    // const serviceD = container.getComponent<TestServiceD>(TestServiceD);
    const injection = container.getComponent<TestPropInjection>(TestPropInjection);
    injection.hello();
});