"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultNodeFactory = void 0;
const React = require("react");
const DefaultNodeModel_1 = require("./DefaultNodeModel");
const DefaultNodeWidget_1 = require("./DefaultNodeWidget");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
class DefaultNodeFactory extends react_canvas_core_1.AbstractReactFactory {
    constructor() {
        super('default');
    }
    generateReactWidget(event) {
        return React.createElement(DefaultNodeWidget_1.DefaultNodeWidget, { engine: this.engine, node: event.model });
    }
    generateModel(event) {
        return new DefaultNodeModel_1.DefaultNodeModel();
    }
}
exports.DefaultNodeFactory = DefaultNodeFactory;
//# sourceMappingURL=DefaultNodeFactory.js.map