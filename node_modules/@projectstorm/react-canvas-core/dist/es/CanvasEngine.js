"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasEngine = void 0;
const lodash_1 = require("lodash");
const FactoryBank_1 = require("./core/FactoryBank");
const BaseObserver_1 = require("./core/BaseObserver");
const geometry_1 = require("@projectstorm/geometry");
const ActionEventBus_1 = require("./core-actions/ActionEventBus");
const ZoomCanvasAction_1 = require("./actions/ZoomCanvasAction");
const DeleteItemsAction_1 = require("./actions/DeleteItemsAction");
const StateMachine_1 = require("./core-state/StateMachine");
class CanvasEngine extends BaseObserver_1.BaseObserver {
    constructor(options = {}) {
        super();
        this.model = null;
        this.eventBus = new ActionEventBus_1.ActionEventBus(this);
        this.stateMachine = new StateMachine_1.StateMachine(this);
        this.layerFactories = new FactoryBank_1.FactoryBank();
        this.registerFactoryBank(this.layerFactories);
        /**
         * Overrides the standard options with the possible given options
         */
        this.options = Object.assign({ registerDefaultDeleteItemsAction: true, registerDefaultZoomCanvasAction: true, repaintDebounceMs: 0 }, options);
        if (this.options.registerDefaultZoomCanvasAction === true) {
            this.eventBus.registerAction(new ZoomCanvasAction_1.ZoomCanvasAction());
        }
        if (this.options.registerDefaultDeleteItemsAction === true) {
            this.eventBus.registerAction(new DeleteItemsAction_1.DeleteItemsAction());
        }
    }
    getStateMachine() {
        return this.stateMachine;
    }
    getRelativeMousePoint(event) {
        const point = this.getRelativePoint(event.clientX, event.clientY);
        return new geometry_1.Point((point.x - this.model.getOffsetX()) / (this.model.getZoomLevel() / 100.0), (point.y - this.model.getOffsetY()) / (this.model.getZoomLevel() / 100.0));
    }
    getRelativePoint(x, y) {
        const canvasRect = this.canvas.getBoundingClientRect();
        return new geometry_1.Point(x - canvasRect.left, y - canvasRect.top);
    }
    registerFactoryBank(factory) {
        factory.registerListener({
            factoryAdded: (event) => {
                event.factory.setDiagramEngine(this);
            },
            factoryRemoved: (event) => {
                event.factory.setDiagramEngine(null);
            }
        });
    }
    getActionEventBus() {
        return this.eventBus;
    }
    getLayerFactories() {
        return this.layerFactories;
    }
    getFactoryForLayer(layer) {
        if (typeof layer === 'string') {
            return this.layerFactories.getFactory(layer);
        }
        return this.layerFactories.getFactory(layer.getType());
    }
    setModel(model) {
        this.model = model;
        if (this.canvas) {
            requestAnimationFrame(() => {
                this.repaintCanvas();
            });
        }
    }
    getModel() {
        return this.model;
    }
    repaintCanvas(promise) {
        const { repaintDebounceMs } = this.options;
        /**
         * The actual repaint function
         */
        const repaint = () => {
            this.iterateListeners((listener) => {
                if (listener.repaintCanvas) {
                    listener.repaintCanvas();
                }
            });
        };
        // if the `repaintDebounceMs` option is > 0, then apply the debounce
        let repaintFn = repaint;
        if (repaintDebounceMs > 0) {
            repaintFn = lodash_1.debounce(repaint, repaintDebounceMs);
        }
        if (promise) {
            return new Promise((resolve) => {
                const l = this.registerListener({
                    rendered: () => {
                        resolve();
                        l.deregister();
                    }
                });
                repaintFn();
            });
        }
        repaintFn();
    }
    setCanvas(canvas) {
        if (this.canvas !== canvas) {
            this.canvas = canvas;
            if (canvas) {
                this.fireEvent({}, 'canvasReady');
            }
        }
    }
    getCanvas() {
        return this.canvas;
    }
    getMouseElement(event) {
        return null;
    }
    zoomToFit() {
        const xFactor = this.canvas.clientWidth / this.canvas.scrollWidth;
        const yFactor = this.canvas.clientHeight / this.canvas.scrollHeight;
        const zoomFactor = xFactor < yFactor ? xFactor : yFactor;
        this.model.setZoomLevel(this.model.getZoomLevel() * zoomFactor);
        this.model.setOffset(0, 0);
        this.repaintCanvas();
    }
}
exports.CanvasEngine = CanvasEngine;
//# sourceMappingURL=CanvasEngine.js.map