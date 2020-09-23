"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryBank = void 0;
const BaseObserver_1 = require("./BaseObserver");
const _ = require("lodash");
/**
 * Store and managed Factories that extend from Abstractfactory
 */
class FactoryBank extends BaseObserver_1.BaseObserver {
    constructor() {
        super();
        this.factories = {};
    }
    getFactories() {
        return _.values(this.factories);
    }
    clearFactories() {
        for (let factory in this.factories) {
            this.deregisterFactory(factory);
        }
    }
    getFactory(type) {
        if (!this.factories[type]) {
            throw new Error(`Cannot find factory with type [${type}]`);
        }
        return this.factories[type];
    }
    registerFactory(factory) {
        factory.setFactoryBank(this);
        this.factories[factory.getType()] = factory;
        // todo fixme
        this.fireEvent({ factory }, 'factoryAdded');
    }
    deregisterFactory(type) {
        const factory = this.factories[type];
        factory.setFactoryBank(null);
        delete this.factories[type];
        // todo fixme
        this.fireEvent({ factory }, 'factoryRemoved');
    }
}
exports.FactoryBank = FactoryBank;
//# sourceMappingURL=FactoryBank.js.map