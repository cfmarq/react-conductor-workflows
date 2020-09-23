"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkLayerWidget = void 0;
const React = require("react");
const styled_1 = require("@emotion/styled");
const _ = require("lodash");
const LinkWidget_1 = require("../link/LinkWidget");
var S;
(function (S) {
    S.Container = styled_1.default.div ``;
})(S || (S = {}));
class LinkLayerWidget extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null, 
        //only perform these actions when we have a diagram
        _.map(this.props.layer.getLinks(), (link) => {
            return React.createElement(LinkWidget_1.LinkWidget, { key: link.getID(), link: link, diagramEngine: this.props.engine });
        })));
    }
}
exports.LinkLayerWidget = LinkLayerWidget;
//# sourceMappingURL=LinkLayerWidget.js.map