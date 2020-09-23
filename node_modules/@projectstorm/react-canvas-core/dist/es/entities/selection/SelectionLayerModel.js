"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionLayerModel = void 0;
const LayerModel_1 = require("../layer/LayerModel");
class SelectionLayerModel extends LayerModel_1.LayerModel {
    constructor() {
        super({
            transformed: false,
            isSvg: false,
            type: 'selection'
        });
    }
    setBox(rect) {
        this.box = rect;
    }
    getChildModelFactoryBank() {
        // is not used as it doesnt serialize
        return null;
    }
}
exports.SelectionLayerModel = SelectionLayerModel;
//# sourceMappingURL=SelectionLayerModel.js.map