"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLinkWidget = void 0;
const React = require("react");
const react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
const DefaultLinkPointWidget_1 = require("./DefaultLinkPointWidget");
const DefaultLinkSegmentWidget_1 = require("./DefaultLinkSegmentWidget");
class DefaultLinkWidget extends React.Component {
    constructor(props) {
        super(props);
        this.refPaths = [];
        this.state = {
            selected: false
        };
    }
    componentDidUpdate() {
        this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
            return ref.current;
        }));
    }
    componentDidMount() {
        this.props.link.setRenderedPaths(this.refPaths.map((ref) => {
            return ref.current;
        }));
    }
    componentWillUnmount() {
        this.props.link.setRenderedPaths([]);
    }
    addPointToLink(event, index) {
        if (!event.shiftKey &&
            !this.props.link.isLocked() &&
            this.props.link.getPoints().length - 1 <= this.props.diagramEngine.getMaxNumberPointsPerLink()) {
            const point = new react_diagrams_core_1.PointModel({
                link: this.props.link,
                position: this.props.diagramEngine.getRelativeMousePoint(event)
            });
            this.props.link.addPoint(point, index);
            event.persist();
            event.stopPropagation();
            this.forceUpdate(() => {
                this.props.diagramEngine.getActionEventBus().fireAction({
                    event,
                    model: point
                });
            });
        }
    }
    generatePoint(point) {
        return (React.createElement(DefaultLinkPointWidget_1.DefaultLinkPointWidget, { key: point.getID(), point: point, colorSelected: this.props.link.getOptions().selectedColor, color: this.props.link.getOptions().color }));
    }
    generateLink(path, extraProps, id) {
        const ref = React.createRef();
        this.refPaths.push(ref);
        return (React.createElement(DefaultLinkSegmentWidget_1.DefaultLinkSegmentWidget, { key: `link-${id}`, path: path, selected: this.state.selected, diagramEngine: this.props.diagramEngine, factory: this.props.diagramEngine.getFactoryForLink(this.props.link), link: this.props.link, forwardRef: ref, onSelection: (selected) => {
                this.setState({ selected: selected });
            }, extras: extraProps }));
    }
    render() {
        //ensure id is present for all points on the path
        var points = this.props.link.getPoints();
        var paths = [];
        this.refPaths = [];
        if (points.length === 2) {
            paths.push(this.generateLink(this.props.link.getSVGPath(), {
                onMouseDown: (event) => {
                    this.addPointToLink(event, 1);
                }
            }, '0'));
            // draw the link as dangeling
            if (this.props.link.getTargetPort() == null) {
                paths.push(this.generatePoint(points[1]));
            }
        }
        else {
            //draw the multiple anchors and complex line instead
            for (let j = 0; j < points.length - 1; j++) {
                paths.push(this.generateLink(react_diagrams_core_1.LinkWidget.generateLinePath(points[j], points[j + 1]), {
                    'data-linkid': this.props.link.getID(),
                    'data-point': j,
                    onMouseDown: (event) => {
                        this.addPointToLink(event, j + 1);
                    }
                }, j));
            }
            //render the circles
            for (let i = 1; i < points.length - 1; i++) {
                paths.push(this.generatePoint(points[i]));
            }
            if (this.props.link.getTargetPort() == null) {
                paths.push(this.generatePoint(points[points.length - 1]));
            }
        }
        return React.createElement("g", { "data-default-link-test": this.props.link.getOptions().testName }, paths);
    }
}
exports.DefaultLinkWidget = DefaultLinkWidget;
//# sourceMappingURL=DefaultLinkWidget.js.map