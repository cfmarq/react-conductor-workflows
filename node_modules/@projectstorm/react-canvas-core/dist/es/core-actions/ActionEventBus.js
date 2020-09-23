"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionEventBus = void 0;
const Action_1 = require("./Action");
const _ = require("lodash");
class ActionEventBus {
    constructor(engine) {
        this.actions = {};
        this.engine = engine;
        this.keys = {};
    }
    getKeys() {
        return _.keys(this.keys);
    }
    registerAction(action) {
        action.setEngine(this.engine);
        this.actions[action.id] = action;
        return () => {
            this.deregisterAction(action);
        };
    }
    deregisterAction(action) {
        action.setEngine(null);
        delete this.actions[action.id];
    }
    getActionsForType(type) {
        return _.filter(this.actions, (action) => {
            return action.options.type === type;
        });
    }
    getModelForEvent(actionEvent) {
        if (actionEvent.model) {
            return actionEvent.model;
        }
        return this.engine.getMouseElement(actionEvent.event);
    }
    getActionsForEvent(actionEvent) {
        const { event } = actionEvent;
        if (event.type === 'mousedown') {
            return this.getActionsForType(Action_1.InputType.MOUSE_DOWN);
        }
        else if (event.type === 'mouseup') {
            return this.getActionsForType(Action_1.InputType.MOUSE_UP);
        }
        else if (event.type === 'keydown') {
            // store the recorded key
            this.keys[event.key.toLowerCase()] = true;
            return this.getActionsForType(Action_1.InputType.KEY_DOWN);
        }
        else if (event.type === 'keyup') {
            // delete the recorded key
            delete this.keys[event.key.toLowerCase()];
            return this.getActionsForType(Action_1.InputType.KEY_UP);
        }
        else if (event.type === 'mousemove') {
            return this.getActionsForType(Action_1.InputType.MOUSE_MOVE);
        }
        else if (event.type === 'wheel') {
            return this.getActionsForType(Action_1.InputType.MOUSE_WHEEL);
        }
        return [];
    }
    fireAction(actionEvent) {
        const actions = this.getActionsForEvent(actionEvent);
        for (let action of actions) {
            action.options.fire(actionEvent);
        }
    }
}
exports.ActionEventBus = ActionEventBus;
//# sourceMappingURL=ActionEventBus.js.map