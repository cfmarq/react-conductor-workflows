"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLabelWidget = void 0;
const React = require("react");
const styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.Label = styled_1.default.div `
		background: rgba(0, 0, 0, 0.8);
		border-radius: 5px;
		color: white;
		font-size: 12px;
		padding: 4px 8px;
		font-family: sans-serif;
		user-select: none;
	`;
})(S || (S = {}));
class DefaultLabelWidget extends React.Component {
    render() {
        return React.createElement(S.Label, null, this.props.model.getOptions().label);
    }
}
exports.DefaultLabelWidget = DefaultLabelWidget;
//# sourceMappingURL=DefaultLabelWidget.js.map