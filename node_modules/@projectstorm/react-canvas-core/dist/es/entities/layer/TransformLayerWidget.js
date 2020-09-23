"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformLayerWidget = void 0;
const React = require("react");
const styled_1 = require("@emotion/styled");
const core_1 = require("@emotion/core");
var S;
(function (S) {
    const shared = core_1.css `
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
		pointer-events: none;
		transform-origin: 0 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	`;
    S.DivLayer = styled_1.default.div `
		${shared}
	`;
    S.SvgLayer = styled_1.default.svg `
		${shared}
	`;
})(S || (S = {}));
class TransformLayerWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getTransform() {
        const model = this.props.layer.getParent();
        return `
			translate(
				${model.getOffsetX()}px,
				${model.getOffsetY()}px)
			scale(
				${model.getZoomLevel() / 100.0}
			)
  	`;
    }
    getTransformStyle() {
        if (this.props.layer.getOptions().transformed) {
            return {
                transform: this.getTransform()
            };
        }
        return {};
    }
    render() {
        if (this.props.layer.getOptions().isSvg) {
            return React.createElement(S.SvgLayer, { style: this.getTransformStyle() }, this.props.children);
        }
        return React.createElement(S.DivLayer, { style: this.getTransformStyle() }, this.props.children);
    }
}
exports.TransformLayerWidget = TransformLayerWidget;
//# sourceMappingURL=TransformLayerWidget.js.map