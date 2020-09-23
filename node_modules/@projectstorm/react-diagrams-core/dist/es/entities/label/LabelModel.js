"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelModel = void 0;
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
class LabelModel extends react_canvas_core_1.BaseModel {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { offsetX: options.offsetX || 0, offsetY: options.offsetY || 0 }));
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.offsetX = event.data.offsetX;
        this.options.offsetY = event.data.offsetY;
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { offsetX: this.options.offsetX, offsetY: this.options.offsetY });
    }
}
exports.LabelModel = LabelModel;
//# sourceMappingURL=LabelModel.js.map