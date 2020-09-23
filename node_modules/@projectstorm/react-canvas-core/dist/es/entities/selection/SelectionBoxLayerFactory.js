"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionBoxLayerFactory = void 0;
const React = require("react");
const AbstractReactFactory_1 = require("../../core/AbstractReactFactory");
const SelectionLayerModel_1 = require("./SelectionLayerModel");
const SelectionBoxWidget_1 = require("./SelectionBoxWidget");
class SelectionBoxLayerFactory extends AbstractReactFactory_1.AbstractReactFactory {
    constructor() {
        super('selection');
    }
    generateModel(event) {
        return new SelectionLayerModel_1.SelectionLayerModel();
    }
    generateReactWidget(event) {
        return React.createElement(SelectionBoxWidget_1.SelectionBoxWidget, { rect: event.model.box });
    }
}
exports.SelectionBoxLayerFactory = SelectionBoxLayerFactory;
//# sourceMappingURL=SelectionBoxLayerFactory.js.map