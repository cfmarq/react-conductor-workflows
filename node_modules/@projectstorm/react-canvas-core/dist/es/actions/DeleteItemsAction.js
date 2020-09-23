"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteItemsAction = void 0;
const Action_1 = require("../core-actions/Action");
const _ = require("lodash");
/**
 * Deletes all selected items
 */
class DeleteItemsAction extends Action_1.Action {
    constructor(options = {}) {
        const keyCodes = options.keyCodes || [46, 8];
        const modifiers = Object.assign({ ctrlKey: false, shiftKey: false, altKey: false, metaKey: false }, options.modifiers);
        super({
            type: Action_1.InputType.KEY_DOWN,
            fire: (event) => {
                const { keyCode, ctrlKey, shiftKey, altKey, metaKey } = event.event;
                if (keyCodes.indexOf(keyCode) !== -1 && _.isEqual({ ctrlKey, shiftKey, altKey, metaKey }, modifiers)) {
                    _.forEach(this.engine.getModel().getSelectedEntities(), (model) => {
                        // only delete items which are not locked
                        if (!model.isLocked()) {
                            model.remove();
                        }
                    });
                    this.engine.repaintCanvas();
                }
            }
        });
    }
}
exports.DeleteItemsAction = DeleteItemsAction;
//# sourceMappingURL=DeleteItemsAction.js.map