"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.InputType = void 0;
const Toolkit_1 = require("../Toolkit");
var InputType;
(function (InputType) {
    InputType["MOUSE_DOWN"] = "mouse-down";
    InputType["MOUSE_UP"] = "mouse-up";
    InputType["MOUSE_MOVE"] = "mouse-move";
    InputType["MOUSE_WHEEL"] = "mouse-wheel";
    InputType["KEY_DOWN"] = "key-down";
    InputType["KEY_UP"] = "key-up";
})(InputType = exports.InputType || (exports.InputType = {}));
class Action {
    constructor(options) {
        this.options = options;
        this.id = Toolkit_1.Toolkit.UID();
    }
    setEngine(engine) {
        this.engine = engine;
    }
}
exports.Action = Action;
//# sourceMappingURL=Action.js.map