"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasWidget = void 0;
const React = require("react");
const TransformLayerWidget_1 = require("../layer/TransformLayerWidget");
const styled_1 = require("@emotion/styled");
const SmartLayerWidget_1 = require("../layer/SmartLayerWidget");
var S;
(function (S) {
    S.Canvas = styled_1.default.div `
		position: relative;
		cursor: move;
		overflow: hidden;
	`;
})(S || (S = {}));
class CanvasWidget extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            action: null,
            diagramEngineListener: null
        };
    }
    componentWillUnmount() {
        this.props.engine.deregisterListener(this.canvasListener);
        this.props.engine.setCanvas(null);
        document.removeEventListener('keyup', this.keyUp);
        document.removeEventListener('keydown', this.keyDown);
    }
    registerCanvas() {
        this.props.engine.setCanvas(this.ref.current);
        this.props.engine.iterateListeners((list) => {
            list.rendered && list.rendered();
        });
    }
    componentDidUpdate() {
        this.registerCanvas();
    }
    componentDidMount() {
        this.canvasListener = this.props.engine.registerListener({
            repaintCanvas: () => {
                this.forceUpdate();
            }
        });
        this.keyDown = (event) => {
            this.props.engine.getActionEventBus().fireAction({ event });
        };
        this.keyUp = (event) => {
            this.props.engine.getActionEventBus().fireAction({ event });
        };
        document.addEventListener('keyup', this.keyUp);
        document.addEventListener('keydown', this.keyDown);
        this.registerCanvas();
    }
    render() {
        const engine = this.props.engine;
        const model = engine.getModel();
        return (React.createElement(S.Canvas, { className: this.props.className, ref: this.ref, onWheel: (event) => {
                this.props.engine.getActionEventBus().fireAction({ event });
            }, onMouseDown: (event) => {
                this.props.engine.getActionEventBus().fireAction({ event });
            }, onMouseUp: (event) => {
                this.props.engine.getActionEventBus().fireAction({ event });
            }, onMouseMove: (event) => {
                this.props.engine.getActionEventBus().fireAction({ event });
            } }, model.getLayers().map((layer) => {
            return (React.createElement(TransformLayerWidget_1.TransformLayerWidget, { layer: layer, key: layer.getID() },
                React.createElement(SmartLayerWidget_1.SmartLayerWidget, { layer: layer, engine: this.props.engine, key: layer.getID() })));
        })));
    }
}
exports.CanvasWidget = CanvasWidget;
//# sourceMappingURL=CanvasWidget.js.map