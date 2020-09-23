"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeLayerWidget = void 0;
const React = require("react");
const styled_1 = require("@emotion/styled");
const _ = require("lodash");
const NodeWidget_1 = require("../node/NodeWidget");
var S;
(function (S) {
    S.Container = styled_1.default.div ``;
})(S || (S = {}));
class NodeLayerWidget extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null, _.map(this.props.layer.getNodes(), (node) => {
            return React.createElement(NodeWidget_1.NodeWidget, { key: node.getID(), diagramEngine: this.props.engine, node: node });
        })));
    }
}
exports.NodeLayerWidget = NodeLayerWidget;
//# sourceMappingURL=NodeLayerWidget.js.map