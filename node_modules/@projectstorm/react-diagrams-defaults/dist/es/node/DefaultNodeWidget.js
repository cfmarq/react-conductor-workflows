"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultNodeWidget = void 0;
const React = require("react");
const _ = require("lodash");
const DefaultPortLabelWidget_1 = require("../port/DefaultPortLabelWidget");
const styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.Node = styled_1.default.div `
		background-color: ${(p) => p.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${(p) => (p.selected ? 'rgb(0,192,255)' : 'black')};
	`;
    S.Title = styled_1.default.div `
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;
    S.TitleName = styled_1.default.div `
		flex-grow: 1;
		padding: 5px 5px;
	`;
    S.Ports = styled_1.default.div `
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;
    S.PortsContainer = styled_1.default.div `
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`;
})(S || (S = {}));
/**
 * Default node that models the DefaultNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
class DefaultNodeWidget extends React.Component {
    constructor() {
        super(...arguments);
        this.generatePort = (port) => {
            return React.createElement(DefaultPortLabelWidget_1.DefaultPortLabel, { engine: this.props.engine, port: port, key: port.getID() });
        };
    }
    render() {
        return (React.createElement(S.Node, { "data-default-node-name": this.props.node.getOptions().name, selected: this.props.node.isSelected(), background: this.props.node.getOptions().color },
            React.createElement(S.Title, null,
                React.createElement(S.TitleName, null, this.props.node.getOptions().name)),
            React.createElement(S.Ports, null,
                React.createElement(S.PortsContainer, null, _.map(this.props.node.getInPorts(), this.generatePort)),
                React.createElement(S.PortsContainer, null, _.map(this.props.node.getOutPorts(), this.generatePort)))));
    }
}
exports.DefaultNodeWidget = DefaultNodeWidget;
//# sourceMappingURL=DefaultNodeWidget.js.map