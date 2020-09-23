"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkWidget = void 0;
const React = require("react");
const _ = require("lodash");
const LabelWidget_1 = require("../label/LabelWidget");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
class LinkWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourcePort: null,
            targetPort: null
        };
    }
    componentWillUnmount() {
        if (this.sourceListener) {
            this.sourceListener.deregister();
        }
        if (this.targetListener) {
            this.targetListener.deregister();
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            sourcePort: nextProps.link.getSourcePort(),
            targetPort: nextProps.link.getTargetPort()
        };
    }
    installTarget() {
        this.targetListener && this.targetListener.deregister();
        if (!this.props.link.getTargetPort())
            return;
        this.targetListener = this.props.link.getTargetPort().registerListener({
            reportInitialPosition: (event) => {
                this.forceUpdate();
            }
        });
    }
    installSource() {
        this.sourceListener && this.sourceListener.deregister();
        if (!this.props.link.getSourcePort())
            return;
        this.sourceListener = this.props.link.getSourcePort().registerListener({
            reportInitialPosition: (event) => {
                this.forceUpdate();
            }
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.sourcePort !== this.state.sourcePort) {
            this.installSource();
        }
        if (prevState.targetPort !== this.state.targetPort) {
            this.installTarget();
        }
    }
    static generateLinePath(firstPoint, lastPoint) {
        return `M${firstPoint.getX()},${firstPoint.getY()} L ${lastPoint.getX()},${lastPoint.getY()}`;
    }
    componentDidMount() {
        if (this.props.link.getSourcePort()) {
            this.installSource();
        }
        if (this.props.link.getTargetPort()) {
            this.installTarget();
        }
    }
    render() {
        const { link } = this.props;
        // only draw the link when we have reported positions
        if (link.getSourcePort() && !link.getSourcePort().reportedPosition) {
            return null;
        }
        if (link.getTargetPort() && !link.getTargetPort().reportedPosition) {
            return null;
        }
        //generate links
        return (React.createElement(react_canvas_core_1.PeformanceWidget, { model: this.props.link, serialized: this.props.link.serialize() }, () => {
            return (React.createElement("g", { "data-linkid": this.props.link.getID() },
                this.props.diagramEngine.generateWidgetForLink(link),
                _.map(this.props.link.getLabels(), (labelModel, index) => {
                    return (React.createElement(LabelWidget_1.LabelWidget, { key: labelModel.getID(), engine: this.props.diagramEngine, label: labelModel, index: index }));
                })));
        }));
    }
}
exports.LinkWidget = LinkWidget;
//# sourceMappingURL=LinkWidget.js.map