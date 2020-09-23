"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLinkFactory = void 0;
const React = require("react");
const DefaultLinkModel_1 = require("./DefaultLinkModel");
const DefaultLinkWidget_1 = require("./DefaultLinkWidget");
const styled_1 = require("@emotion/styled");
const core_1 = require("@emotion/core");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
var S;
(function (S) {
    S.Keyframes = core_1.keyframes `
		from {
			stroke-dashoffset: 24;
		}
		to {
			stroke-dashoffset: 0;
		}
	`;
    const selected = core_1.css `
		stroke-dasharray: 10, 2;
		animation: ${S.Keyframes} 1s linear infinite;
	`;
    S.Path = styled_1.default.path `
		${(p) => p.selected && selected};
		fill: none;
		pointer-events: all;
	`;
})(S || (S = {}));
class DefaultLinkFactory extends react_canvas_core_1.AbstractReactFactory {
    constructor(type = 'default') {
        super(type);
    }
    generateReactWidget(event) {
        return React.createElement(DefaultLinkWidget_1.DefaultLinkWidget, { link: event.model, diagramEngine: this.engine });
    }
    generateModel(event) {
        return new DefaultLinkModel_1.DefaultLinkModel();
    }
    generateLinkSegment(model, selected, path) {
        return (React.createElement(S.Path, { selected: selected, stroke: selected ? model.getOptions().selectedColor : model.getOptions().color, strokeWidth: model.getOptions().width, d: path }));
    }
}
exports.DefaultLinkFactory = DefaultLinkFactory;
//# sourceMappingURL=DefaultLinkFactory.js.map