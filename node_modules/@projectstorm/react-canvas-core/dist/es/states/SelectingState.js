"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectingState = void 0;
const State_1 = require("../core-state/State");
const Action_1 = require("../core-actions/Action");
const SelectionBoxState_1 = require("./SelectionBoxState");
class SelectingState extends State_1.State {
    constructor() {
        super({
            name: 'selecting'
        });
        this.keys = ['shift'];
        this.registerAction(new Action_1.Action({
            type: Action_1.InputType.MOUSE_DOWN,
            fire: (event) => {
                const element = this.engine.getActionEventBus().getModelForEvent(event);
                // go into a selection box on the canvas state
                if (!element) {
                    this.transitionWithEvent(new SelectionBoxState_1.SelectionBoxState(), event);
                }
                else {
                    element.setSelected(true);
                    this.engine.repaintCanvas();
                }
            }
        }));
    }
}
exports.SelectingState = SelectingState;
//# sourceMappingURL=SelectingState.js.map