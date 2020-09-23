"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartLayerWidget = void 0;
const React = require("react");
class SmartLayerWidget extends React.Component {
    shouldComponentUpdate() {
        return this.props.layer.isRepaintEnabled();
    }
    render() {
        return this.props.engine.getFactoryForLayer(this.props.layer).generateReactWidget({ model: this.props.layer });
    }
}
exports.SmartLayerWidget = SmartLayerWidget;
//# sourceMappingURL=SmartLayerWidget.js.map