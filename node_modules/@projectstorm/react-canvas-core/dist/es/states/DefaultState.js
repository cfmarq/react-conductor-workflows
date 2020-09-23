"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultState = void 0;
const State_1 = require("../core-state/State");
const Action_1 = require("../core-actions/Action");
const DragCanvasState_1 = require("./DragCanvasState");
const SelectingState_1 = require("./SelectingState");
const MoveItemsState_1 = require("./MoveItemsState");
class DefaultState extends State_1.State {
    constructor() {
        super({
            name: 'default'
        });
        this.childStates = [new SelectingState_1.SelectingState()];
        // determine what was clicked on
        this.registerAction(new Action_1.Action({
            type: Action_1.InputType.MOUSE_DOWN,
            fire: (event) => {
                const element = this.engine.getActionEventBus().getModelForEvent(event);
                // the canvas was clicked on, transition to the dragging canvas state
                if (!element) {
                    this.transitionWithEvent(new DragCanvasState_1.DragCanvasState(), event);
                }
                else {
                    this.transitionWithEvent(new MoveItemsState_1.MoveItemsState(), event);
                }
            }
        }));
    }
}
exports.DefaultState = DefaultState;
//# sourceMappingURL=DefaultState.js.map