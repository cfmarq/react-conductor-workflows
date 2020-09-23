"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragDiagramItemsState = void 0;
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
const _ = require("lodash");
const PointModel_1 = require("../entities/link/PointModel");
const PortModel_1 = require("../entities/port/PortModel");
class DragDiagramItemsState extends react_canvas_core_1.MoveItemsState {
    constructor() {
        super();
        this.registerAction(new react_canvas_core_1.Action({
            type: react_canvas_core_1.InputType.MOUSE_UP,
            fire: (event) => {
                const item = this.engine.getMouseElement(event.event);
                if (item instanceof PortModel_1.PortModel) {
                    _.forEach(this.initialPositions, (position) => {
                        if (position.item instanceof PointModel_1.PointModel) {
                            const link = position.item.getParent();
                            // only care about the last links
                            if (link.getLastPoint() !== position.item) {
                                return;
                            }
                            if (link.getSourcePort().canLinkToPort(item)) {
                                link.setTargetPort(item);
                                item.reportPosition();
                                this.engine.repaintCanvas();
                            }
                        }
                    });
                }
            }
        }));
    }
}
exports.DragDiagramItemsState = DragDiagramItemsState;
//# sourceMappingURL=DragDiagramItemsState.js.map