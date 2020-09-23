"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathFindingLinkModel = void 0;
const PathFindingLinkFactory_1 = require("./PathFindingLinkFactory");
const react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
class PathFindingLinkModel extends react_diagrams_defaults_1.DefaultLinkModel {
    constructor(options = {}) {
        super(Object.assign({ type: PathFindingLinkFactory_1.PathFindingLinkFactory.NAME }, options));
    }
    performanceTune() {
        return false;
    }
}
exports.PathFindingLinkModel = PathFindingLinkModel;
//# sourceMappingURL=PathFindingLinkModel.js.map