"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointModel = void 0;
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
class PointModel extends react_canvas_core_1.BasePositionModel {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: 'point' }));
        this.parent = options.link;
    }
    isConnectedToPort() {
        return this.parent.getPortForPoint(this) !== null;
    }
    getLink() {
        return this.getParent();
    }
    remove() {
        //clear references
        if (this.parent) {
            this.parent.removePoint(this);
        }
        super.remove();
    }
    isLocked() {
        return super.isLocked() || this.getParent().isLocked();
    }
}
exports.PointModel = PointModel;
//# sourceMappingURL=PointModel.js.map