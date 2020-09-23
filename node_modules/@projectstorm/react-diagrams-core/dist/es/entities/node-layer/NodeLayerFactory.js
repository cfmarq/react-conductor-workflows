"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeLayerFactory = void 0;
const React = require("react");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
const NodeLayerModel_1 = require("./NodeLayerModel");
const NodeLayerWidget_1 = require("./NodeLayerWidget");
class NodeLayerFactory extends react_canvas_core_1.AbstractReactFactory {
    constructor() {
        super('diagram-nodes');
    }
    generateModel(event) {
        return new NodeLayerModel_1.NodeLayerModel();
    }
    generateReactWidget(event) {
        return React.createElement(NodeLayerWidget_1.NodeLayerWidget, { layer: event.model, engine: this.engine });
    }
}
exports.NodeLayerFactory = NodeLayerFactory;
//# sourceMappingURL=NodeLayerFactory.js.map