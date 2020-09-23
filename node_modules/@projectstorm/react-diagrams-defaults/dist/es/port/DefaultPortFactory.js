"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPortFactory = void 0;
const DefaultPortModel_1 = require("./DefaultPortModel");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
class DefaultPortFactory extends react_canvas_core_1.AbstractModelFactory {
    constructor() {
        super('default');
    }
    generateModel() {
        return new DefaultPortModel_1.DefaultPortModel({
            name: 'unknown'
        });
    }
}
exports.DefaultPortFactory = DefaultPortFactory;
//# sourceMappingURL=DefaultPortFactory.js.map