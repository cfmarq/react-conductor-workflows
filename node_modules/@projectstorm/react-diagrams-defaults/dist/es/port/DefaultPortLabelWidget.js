"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPortLabel = void 0;
const React = require("react");
const react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
const styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.PortLabel = styled_1.default.div `
		display: flex;
		margin-top: 1px;
		align-items: center;
	`;
    S.Label = styled_1.default.div `
		padding: 0 5px;
		flex-grow: 1;
	`;
    S.Port = styled_1.default.div `
		width: 15px;
		height: 15px;
		background: rgba(white, 0.1);

		&:hover {
			background: rgb(192, 255, 0);
		}
	`;
})(S || (S = {}));
class DefaultPortLabel extends React.Component {
    render() {
        const port = (React.createElement(react_diagrams_core_1.PortWidget, { engine: this.props.engine, port: this.props.port },
            React.createElement(S.Port, null)));
        const label = React.createElement(S.Label, null, this.props.port.getOptions().label);
        return (React.createElement(S.PortLabel, null,
            this.props.port.getOptions().in ? port : label,
            this.props.port.getOptions().in ? label : port));
    }
}
exports.DefaultPortLabel = DefaultPortLabel;
//# sourceMappingURL=DefaultPortLabelWidget.js.map