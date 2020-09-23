"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeformanceWidget = void 0;
const React = require("react");
const _ = require("lodash");
class PeformanceWidget extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!this.props.model.performanceTune()) {
            return true;
        }
        // deserialization event
        if (this.props.model !== nextProps.model) {
            return true;
        }
        // change event
        return !_.isEqual(this.props.serialized, nextProps.serialized);
    }
    render() {
        return this.props.children();
    }
}
exports.PeformanceWidget = PeformanceWidget;
//# sourceMappingURL=PeformanceWidget.js.map