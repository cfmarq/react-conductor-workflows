"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveItemsState = void 0;
const AbstractDisplacementState_1 = require("../core-state/AbstractDisplacementState");
const Action_1 = require("../core-actions/Action");
const BasePositionModel_1 = require("../core-models/BasePositionModel");
class MoveItemsState extends AbstractDisplacementState_1.AbstractDisplacementState {
    constructor() {
        super({
            name: 'move-items'
        });
        this.registerAction(new Action_1.Action({
            type: Action_1.InputType.MOUSE_DOWN,
            fire: (event) => {
                const element = this.engine.getActionEventBus().getModelForEvent(event);
                if (!element.isSelected()) {
                    this.engine.getModel().clearSelection();
                }
                element.setSelected(true);
                this.engine.repaintCanvas();
            }
        }));
    }
    activated(previous) {
        super.activated(previous);
        this.initialPositions = {};
    }
    fireMouseMoved(event) {
        const items = this.engine.getModel().getSelectedEntities();
        const model = this.engine.getModel();
        for (let item of items) {
            if (item instanceof BasePositionModel_1.BasePositionModel) {
                if (item.isLocked()) {
                    continue;
                }
                if (!this.initialPositions[item.getID()]) {
                    this.initialPositions[item.getID()] = {
                        point: item.getPosition(),
                        item: item
                    };
                }
                const pos = this.initialPositions[item.getID()].point;
                item.setPosition(model.getGridPosition(pos.x + event.virtualDisplacementX), model.getGridPosition(pos.y + event.virtualDisplacementY));
            }
        }
        this.engine.repaintCanvas();
    }
}
exports.MoveItemsState = MoveItemsState;
//# sourceMappingURL=MoveItemsState.js.map