"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeLayerModel = void 0;
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
const NodeModel_1 = require("../node/NodeModel");
class NodeLayerModel extends react_canvas_core_1.LayerModel {
    constructor() {
        super({
            type: 'diagram-nodes',
            isSvg: false,
            transformed: true
        });
    }
    addModel(model) {
        if (!(model instanceof NodeModel_1.NodeModel)) {
            throw new Error('Can only add nodes to this layer');
        }
        model.registerListener({
            entityRemoved: () => {
                this.getParent().removeNode(model);
            }
        });
        super.addModel(model);
    }
    getChildModelFactoryBank(engine) {
        return engine.getNodeFactories();
    }
    getNodes() {
        return this.getModels();
    }
}
exports.NodeLayerModel = NodeLayerModel;
//# sourceMappingURL=NodeLayerModel.js.map