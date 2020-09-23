"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionBoxWidget = void 0;
const React = require("react");
const styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.Container = styled_1.default.div `
		position: absolute;
		background-color: rgba(0, 192, 255, 0.2);
		border: solid 2px rgb(0, 192, 255);
	`;
})(S || (S = {}));
class SelectionBoxWidget extends React.Component {
    render() {
        const { rect } = this.props;
        return (React.createElement(S.Container, { style: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            } }));
    }
}
exports.SelectionBoxWidget = SelectionBoxWidget;
//# sourceMappingURL=SelectionBoxWidget.js.map