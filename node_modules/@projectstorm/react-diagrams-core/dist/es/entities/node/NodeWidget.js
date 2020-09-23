"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWidget = void 0;
const React = require("react");
const _ = require("lodash");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
const styled_1 = require("@emotion/styled");
const resize_observer_polyfill_1 = require("resize-observer-polyfill");
var S;
(function (S) {
    S.Node = styled_1.default.div `
		position: absolute;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		user-select: none;
		cursor: move;
		pointer-events: all;
	`;
})(S || (S = {}));
class NodeWidget extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    componentWillUnmount() {
        this.ob.disconnect();
        this.ob = null;
        this.listener.deregister();
        this.listener = null;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.listener && this.props.node !== prevProps.node) {
            this.listener.deregister();
            this.installSelectionListener();
        }
    }
    installSelectionListener() {
        this.listener = this.props.node.registerListener({
            selectionChanged: (event) => {
                this.forceUpdate();
            }
        });
    }
    componentDidMount() {
        // @ts-ignore
        this.ob = new resize_observer_polyfill_1.default((entities) => {
            const bounds = entities[0].contentRect;
            this.props.node.updateDimensions({ width: bounds.width, height: bounds.height });
            //now mark the links as dirty
            _.forEach(this.props.node.getPorts(), (port) => {
                port.updateCoords(this.props.diagramEngine.getPortCoords(port));
            });
        });
        this.ob.observe(this.ref.current);
        this.installSelectionListener();
    }
    render() {
        return (React.createElement(react_canvas_core_1.PeformanceWidget, { model: this.props.node, serialized: this.props.node.serialize() }, () => {
            return (React.createElement(S.Node, { className: "node", ref: this.ref, "data-nodeid": this.props.node.getID(), style: {
                    top: this.props.node.getY(),
                    left: this.props.node.getX()
                } }, this.props.diagramEngine.generateWidgetForNode(this.props.node)));
        }));
    }
}
exports.NodeWidget = NodeWidget;
//# sourceMappingURL=NodeWidget.js.map