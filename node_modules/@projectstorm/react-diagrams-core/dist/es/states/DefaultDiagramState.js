"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDiagramState = void 0;
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
const PortModel_1 = require("../entities/port/PortModel");
const DragNewLinkState_1 = require("./DragNewLinkState");
const DragDiagramItemsState_1 = require("./DragDiagramItemsState");
class DefaultDiagramState extends react_canvas_core_1.State {
    constructor() {
        super({
            name: 'default-diagrams'
        });
        this.childStates = [new react_canvas_core_1.SelectingState()];
        this.dragCanvas = new react_canvas_core_1.DragCanvasState();
        this.dragNewLink = new DragNewLinkState_1.DragNewLinkState();
        this.dragItems = new DragDiagramItemsState_1.DragDiagramItemsState();
        // determine what was clicked on
        this.registerAction(new react_canvas_core_1.Action({
            type: react_canvas_core_1.InputType.MOUSE_DOWN,
            fire: (event) => {
                const element = this.engine.getActionEventBus().getModelForEvent(event);
                // the canvas was clicked on, transition to the dragging canvas state
                if (!element) {
                    this.transitionWithEvent(this.dragCanvas, event);
                }
                // initiate dragging a new link
                else if (element instanceof PortModel_1.PortModel) {
                    this.transitionWithEvent(this.dragNewLink, event);
                }
                // move the items (and potentially link points)
                else {
                    this.transitionWithEvent(this.dragItems, event);
                }
            }
        }));
    }
}
exports.DefaultDiagramState = DefaultDiagramState;
//# sourceMappingURL=DefaultDiagramState.js.map