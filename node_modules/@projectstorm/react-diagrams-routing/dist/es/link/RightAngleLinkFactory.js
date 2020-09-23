"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightAngleLinkFactory = void 0;
const React = require("react");
const RightAngleLinkWidget_1 = require("./RightAngleLinkWidget");
const react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
const RightAngleLinkModel_1 = require("./RightAngleLinkModel");
/**
 * @author Daniel Lazar
 */
let RightAngleLinkFactory = /** @class */ (() => {
    class RightAngleLinkFactory extends react_diagrams_defaults_1.DefaultLinkFactory {
        constructor() {
            super(RightAngleLinkFactory.NAME);
        }
        generateModel(event) {
            return new RightAngleLinkModel_1.RightAngleLinkModel();
        }
        generateReactWidget(event) {
            return React.createElement(RightAngleLinkWidget_1.RightAngleLinkWidget, { diagramEngine: this.engine, link: event.model, factory: this });
        }
    }
    RightAngleLinkFactory.NAME = 'rightAngle';
    return RightAngleLinkFactory;
})();
exports.RightAngleLinkFactory = RightAngleLinkFactory;
//# sourceMappingURL=RightAngleLinkFactory.js.map