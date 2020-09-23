"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDisplacementState = void 0;
const State_1 = require("./State");
const Action_1 = require("../core-actions/Action");
class AbstractDisplacementState extends State_1.State {
    constructor(options) {
        super(options);
        this.registerAction(new Action_1.Action({
            type: Action_1.InputType.MOUSE_DOWN,
            fire: (actionEvent) => {
                this.initialX = actionEvent.event.clientX;
                this.initialY = actionEvent.event.clientY;
                const rel = this.engine.getRelativePoint(actionEvent.event.clientX, actionEvent.event.clientY);
                this.initialXRelative = rel.x;
                this.initialYRelative = rel.y;
            }
        }));
        this.registerAction(new Action_1.Action({
            type: Action_1.InputType.MOUSE_MOVE,
            fire: (actionEvent) => {
                const { event } = actionEvent;
                this.fireMouseMoved({
                    displacementX: event.clientX - this.initialX,
                    displacementY: event.clientY - this.initialY,
                    virtualDisplacementX: (event.clientX - this.initialX) / (this.engine.getModel().getZoomLevel() / 100.0),
                    virtualDisplacementY: (event.clientY - this.initialY) / (this.engine.getModel().getZoomLevel() / 100.0),
                    event: event
                });
            }
        }));
        this.registerAction(new Action_1.Action({
            type: Action_1.InputType.MOUSE_UP,
            fire: (event) => {
                // when the mouse if up, we eject this state
                this.eject();
            }
        }));
    }
}
exports.AbstractDisplacementState = AbstractDisplacementState;
//# sourceMappingURL=AbstractDisplacementState.js.map