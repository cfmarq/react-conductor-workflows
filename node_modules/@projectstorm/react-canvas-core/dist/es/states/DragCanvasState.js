"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragCanvasState = void 0;
const AbstractDisplacementState_1 = require("../core-state/AbstractDisplacementState");
class DragCanvasState extends AbstractDisplacementState_1.AbstractDisplacementState {
    constructor() {
        super({
            name: 'drag-canvas'
        });
    }
    activated(prev) {
        const _super = Object.create(null, {
            activated: { get: () => super.activated }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.activated.call(this, prev);
            this.engine.getModel().clearSelection();
            yield this.engine.repaintCanvas(true);
            // we can block layer rendering because we are only targeting the transforms
            for (let layer of this.engine.getModel().getLayers()) {
                layer.allowRepaint(false);
            }
            this.initialCanvasX = this.engine.getModel().getOffsetX();
            this.initialCanvasY = this.engine.getModel().getOffsetY();
        });
    }
    deactivated(next) {
        super.deactivated(next);
        for (let layer of this.engine.getModel().getLayers()) {
            layer.allowRepaint(true);
        }
    }
    fireMouseMoved(event) {
        this.engine
            .getModel()
            .setOffset(this.initialCanvasX + event.displacementX, this.initialCanvasY + event.displacementY);
        this.engine.repaintCanvas();
    }
}
exports.DragCanvasState = DragCanvasState;
//# sourceMappingURL=DragCanvasState.js.map