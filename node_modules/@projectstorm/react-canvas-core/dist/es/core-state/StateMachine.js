"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
const _ = require("lodash");
const BaseObserver_1 = require("../core/BaseObserver");
class StateMachine extends BaseObserver_1.BaseObserver {
    constructor(engine) {
        super();
        this.engine = engine;
        this.stateStack = [];
    }
    getCurrentState() {
        return this.currentState;
    }
    pushState(state) {
        this.stateStack.push(state);
        this.setState(state);
    }
    popState() {
        this.stateStack.pop();
        this.setState(_.last(this.stateStack));
    }
    setState(state) {
        state.setEngine(this.engine);
        // if no state object, get the initial state
        if (this.currentState) {
            this.currentState.deactivated(state);
        }
        const old = this.currentState;
        this.currentState = state;
        if (this.currentState) {
            this.currentState.activated(old);
            this.fireEvent({
                newState: state
            }, 'stateChanged');
        }
    }
}
exports.StateMachine = StateMachine;
//# sourceMappingURL=StateMachine.js.map