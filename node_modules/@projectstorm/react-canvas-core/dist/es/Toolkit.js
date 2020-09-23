"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolkit = void 0;
const closest = require("closest");
let Toolkit = /** @class */ (() => {
    class Toolkit {
        /**
         * Generats a unique ID (thanks Stack overflow :3)
         * @returns {String}
         */
        static UID() {
            if (Toolkit.TESTING) {
                Toolkit.TESTING_UID++;
                return `${Toolkit.TESTING_UID}`;
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        }
        /**
         * Finds the closest element as a polyfill
         */
        static closest(element, selector) {
            if (document.body.closest) {
                return element.closest(selector);
            }
            return closest(element, selector);
        }
    }
    Toolkit.TESTING = false;
    Toolkit.TESTING_UID = 0;
    return Toolkit;
})();
exports.Toolkit = Toolkit;
//# sourceMappingURL=Toolkit.js.map