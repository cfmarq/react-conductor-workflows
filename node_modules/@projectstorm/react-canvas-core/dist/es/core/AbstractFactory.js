"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractFactory = void 0;
/**
 * Base factory for all the different types of entities.
 * Gets registered with the engine, and is used to generate models
 */
class AbstractFactory {
    constructor(type) {
        this.type = type;
    }
    setDiagramEngine(engine) {
        this.engine = engine;
    }
    setFactoryBank(bank) {
        this.bank = bank;
    }
    getType() {
        return this.type;
    }
}
exports.AbstractFactory = AbstractFactory;
//# sourceMappingURL=AbstractFactory.js.map