"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionBoxState = void 0;
const AbstractDisplacementState_1 = require("../core-state/AbstractDisplacementState");
const SelectionLayerModel_1 = require("../entities/selection/SelectionLayerModel");
const geometry_1 = require("@projectstorm/geometry");
class SelectionBoxState extends AbstractDisplacementState_1.AbstractDisplacementState {
    constructor() {
        super({
            name: 'selection-box'
        });
    }
    activated(previous) {
        super.activated(previous);
        this.layer = new SelectionLayerModel_1.SelectionLayerModel();
        this.engine.getModel().addLayer(this.layer);
    }
    deactivated(next) {
        super.deactivated(next);
        this.layer.remove();
        this.engine.repaintCanvas();
    }
    getBoxDimensions(event) {
        const rel = this.engine.getRelativePoint(event.event.clientX, event.event.clientY);
        return {
            left: rel.x > this.initialXRelative ? this.initialXRelative : rel.x,
            top: rel.y > this.initialYRelative ? this.initialYRelative : rel.y,
            width: Math.abs(rel.x - this.initialXRelative),
            height: Math.abs(rel.y - this.initialYRelative),
            right: rel.x < this.initialXRelative ? this.initialXRelative : rel.x,
            bottom: rel.y < this.initialYRelative ? this.initialYRelative : rel.y
        };
    }
    fireMouseMoved(event) {
        this.layer.setBox(this.getBoxDimensions(event));
        const relative = this.engine.getRelativeMousePoint({
            clientX: this.initialX,
            clientY: this.initialY
        });
        if (event.virtualDisplacementX < 0) {
            relative.x -= Math.abs(event.virtualDisplacementX);
        }
        if (event.virtualDisplacementY < 0) {
            relative.y -= Math.abs(event.virtualDisplacementY);
        }
        const rect = new geometry_1.Rectangle(relative, Math.abs(event.virtualDisplacementX), Math.abs(event.virtualDisplacementY));
        for (let model of this.engine.getModel().getSelectionEntities()) {
            if (model.getBoundingBox) {
                const bounds = model.getBoundingBox();
                if (rect.containsPoint(bounds.getTopLeft()) && rect.containsPoint(bounds.getBottomRight())) {
                    model.setSelected(true);
                }
                else {
                    model.setSelected(false);
                }
            }
        }
        this.engine.repaintCanvas();
    }
}
exports.SelectionBoxState = SelectionBoxState;
//# sourceMappingURL=SelectionBoxState.js.map