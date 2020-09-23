"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLinkPointWidget = void 0;
const React = require("react");
const styled_1 = require("@emotion/styled");
var S;
(function (S) {
    S.PointTop = styled_1.default.circle `
		pointer-events: all;
	`;
})(S || (S = {}));
class DefaultLinkPointWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }
    render() {
        const { point } = this.props;
        return (React.createElement("g", null,
            React.createElement("circle", { cx: point.getPosition().x, cy: point.getPosition().y, r: 5, fill: this.state.selected || this.props.point.isSelected() ? this.props.colorSelected : this.props.color }),
            React.createElement(S.PointTop, { className: "point", onMouseLeave: () => {
                    this.setState({ selected: false });
                }, onMouseEnter: () => {
                    this.setState({ selected: true });
                }, "data-id": point.getID(), "data-linkid": point.getLink().getID(), cx: point.getPosition().x, cy: point.getPosition().y, r: 15, opacity: 0.0 })));
    }
}
exports.DefaultLinkPointWidget = DefaultLinkPointWidget;
//# sourceMappingURL=DefaultLinkPointWidget.js.map