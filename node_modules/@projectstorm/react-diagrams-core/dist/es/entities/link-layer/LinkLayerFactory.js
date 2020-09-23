"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkLayerFactory = void 0;
const React = require("react");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
const LinkLayerModel_1 = require("./LinkLayerModel");
const LinkLayerWidget_1 = require("./LinkLayerWidget");
class LinkLayerFactory extends react_canvas_core_1.AbstractReactFactory {
    constructor() {
        super('diagram-links');
    }
    generateModel(event) {
        return new LinkLayerModel_1.LinkLayerModel();
    }
    generateReactWidget(event) {
        return React.createElement(LinkLayerWidget_1.LinkLayerWidget, { layer: event.model, engine: this.engine });
    }
}
exports.LinkLayerFactory = LinkLayerFactory;
//# sourceMappingURL=LinkLayerFactory.js.map