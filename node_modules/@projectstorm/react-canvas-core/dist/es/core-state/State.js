"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const Action_1 = require("../core-actions/Action");
const _ = require("lodash");
class State {
    constructor(options) {
        this.actions = [];
        this.keys = [];
        this.childStates = [];
        this.options = options;
    }
    setEngine(engine) {
        this.engine = engine;
    }
    getOptions() {
        return this.options;
    }
    eject() {
        this.engine.getStateMachine().popState();
    }
    transitionWithEvent(state, event) {
        this.engine.getStateMachine().pushState(state);
        this.engine.getActionEventBus().fireAction(event);
    }
    registerAction(action) {
        this.actions.push(action);
    }
    tryActivateParentState(keys) {
        if (this.keys.length > 0 && !this.isKeysFullfilled(keys)) {
            this.eject();
            return true;
        }
        return false;
    }
    tryActivateChildState(keys) {
        const state = this.findStateToActivate(keys);
        if (state) {
            this.engine.getStateMachine().pushState(state);
            return true;
        }
        return false;
    }
    findStateToActivate(keys) {
        for (let child of this.childStates) {
            if (child.isKeysFullfilled(keys)) {
                return child;
            }
        }
        return null;
    }
    isKeysFullfilled(keys) {
        return _.intersection(this.keys, keys).length === this.keys.length;
    }
    activated(previous) {
        const keys = this.engine.getActionEventBus().getKeys();
        if (this.tryActivateParentState(keys) || this.tryActivateChildState(keys)) {
            return;
        }
        // perhaps we need to pop again?
        this.handler1 = this.engine.getActionEventBus().registerAction(new Action_1.Action({
            type: Action_1.InputType.KEY_DOWN,
            fire: () => {
                this.tryActivateChildState(this.engine.getActionEventBus().getKeys());
            }
        }));
        this.handler2 = this.engine.getActionEventBus().registerAction(new Action_1.Action({
            type: Action_1.InputType.KEY_UP,
            fire: () => {
                this.tryActivateParentState(this.engine.getActionEventBus().getKeys());
            }
        }));
        for (let action of this.actions) {
            this.engine.getActionEventBus().registerAction(action);
        }
    }
    deactivated(next) {
        if (this.handler1) {
            this.handler1();
        }
        if (this.handler2) {
            this.handler2();
        }
        // if this happens, we are going into heirachial state machine mode
        for (let action of this.actions) {
            this.engine.getActionEventBus().deregisterAction(action);
        }
    }
}
exports.State = State;
//# sourceMappingURL=State.js.map