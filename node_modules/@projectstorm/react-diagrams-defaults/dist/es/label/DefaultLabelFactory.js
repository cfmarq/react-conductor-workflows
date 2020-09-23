"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLabelFactory = void 0;
const React = require("react");
const DefaultLabelModel_1 = require("./DefaultLabelModel");
const DefaultLabelWidget_1 = require("./DefaultLabelWidget");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
/**
 * @author Dylan Vorster
 */
class DefaultLabelFactory extends react_canvas_core_1.AbstractReactFactory {
    constructor() {
        super('default');
    }
    generateReactWidget(event) {
        return React.createElement(DefaultLabelWidget_1.DefaultLabelWidget, { model: event.model });
    }
    generateModel(event) {
        return new DefaultLabelModel_1.DefaultLabelModel();
    }
}
exports.DefaultLabelFactory = DefaultLabelFactory;
//# sourceMappingURL=DefaultLabelFactory.js.map