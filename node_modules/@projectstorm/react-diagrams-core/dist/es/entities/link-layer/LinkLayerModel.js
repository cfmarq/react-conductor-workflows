"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkLayerModel = void 0;
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
const LinkModel_1 = require("../link/LinkModel");
class LinkLayerModel extends react_canvas_core_1.LayerModel {
    constructor() {
        super({
            type: 'diagram-links',
            isSvg: true,
            transformed: true
        });
    }
    addModel(model) {
        if (!(model instanceof LinkModel_1.LinkModel)) {
            throw new Error('Can only add links to this layer');
        }
        model.registerListener({
            entityRemoved: () => {
                this.getParent().removeLink(model);
            }
        });
        super.addModel(model);
    }
    getLinks() {
        return this.getModels();
    }
    getChildModelFactoryBank(engine) {
        return engine.getLinkFactories();
    }
}
exports.LinkLayerModel = LinkLayerModel;
//# sourceMappingURL=LinkLayerModel.js.map