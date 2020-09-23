"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragNewLinkState = void 0;
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
const PortModel_1 = require("../entities/port/PortModel");
class DragNewLinkState extends react_canvas_core_1.AbstractDisplacementState {
    constructor(options = {}) {
        super({ name: 'drag-new-link' });
        this.config = Object.assign({ allowLooseLinks: true, allowLinksFromLockedPorts: false }, options);
        this.registerAction(new react_canvas_core_1.Action({
            type: react_canvas_core_1.InputType.MOUSE_DOWN,
            fire: (event) => {
                this.port = this.engine.getMouseElement(event.event);
                if (!this.config.allowLinksFromLockedPorts && this.port.isLocked()) {
                    this.eject();
                    return;
                }
                this.link = this.port.createLinkModel();
                // if no link is given, just eject the state
                if (!this.link) {
                    this.eject();
                    return;
                }
                this.link.setSelected(true);
                this.link.setSourcePort(this.port);
                this.engine.getModel().addLink(this.link);
                this.port.reportPosition();
            }
        }));
        this.registerAction(new react_canvas_core_1.Action({
            type: react_canvas_core_1.InputType.MOUSE_UP,
            fire: (event) => {
                const model = this.engine.getMouseElement(event.event);
                // check to see if we connected to a new port
                if (model instanceof PortModel_1.PortModel) {
                    if (this.port.canLinkToPort(model)) {
                        this.link.setTargetPort(model);
                        model.reportPosition();
                        this.engine.repaintCanvas();
                        return;
                    }
                    else {
                        this.link.remove();
                        this.engine.repaintCanvas();
                        return;
                    }
                }
                if (!this.config.allowLooseLinks) {
                    this.link.remove();
                    this.engine.repaintCanvas();
                }
            }
        }));
    }
    /**
     * Calculates the link's far-end point position on mouse move.
     * In order to be as precise as possible the mouse initialXRelative & initialYRelative are taken into account as well
     * as the possible engine offset
     */
    fireMouseMoved(event) {
        const portPos = this.port.getPosition();
        const zoomLevelPercentage = this.engine.getModel().getZoomLevel() / 100;
        const engineOffsetX = this.engine.getModel().getOffsetX() / zoomLevelPercentage;
        const engineOffsetY = this.engine.getModel().getOffsetY() / zoomLevelPercentage;
        const initialXRelative = this.initialXRelative / zoomLevelPercentage;
        const initialYRelative = this.initialYRelative / zoomLevelPercentage;
        const linkNextX = portPos.x - engineOffsetX + (initialXRelative - portPos.x) + event.virtualDisplacementX;
        const linkNextY = portPos.y - engineOffsetY + (initialYRelative - portPos.y) + event.virtualDisplacementY;
        this.link.getLastPoint().setPosition(linkNextX, linkNextY);
        this.engine.repaintCanvas();
    }
}
exports.DragNewLinkState = DragNewLinkState;
//# sourceMappingURL=DragNewLinkState.js.map