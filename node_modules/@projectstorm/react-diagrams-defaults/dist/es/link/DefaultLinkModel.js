"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLinkModel = void 0;
const react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
const DefaultLabelModel_1 = require("../label/DefaultLabelModel");
const geometry_1 = require("@projectstorm/geometry");
class DefaultLinkModel extends react_diagrams_core_1.LinkModel {
    constructor(options = {}) {
        super(Object.assign({ type: 'default', width: options.width || 3, color: options.color || 'gray', selectedColor: options.selectedColor || 'rgb(0,192,255)', curvyness: 50 }, options));
    }
    calculateControlOffset(port) {
        if (port.getOptions().alignment === react_diagrams_core_1.PortModelAlignment.RIGHT) {
            return [this.options.curvyness, 0];
        }
        else if (port.getOptions().alignment === react_diagrams_core_1.PortModelAlignment.LEFT) {
            return [-this.options.curvyness, 0];
        }
        else if (port.getOptions().alignment === react_diagrams_core_1.PortModelAlignment.TOP) {
            return [0, -this.options.curvyness];
        }
        return [0, this.options.curvyness];
    }
    getSVGPath() {
        if (this.points.length == 2) {
            const curve = new geometry_1.BezierCurve();
            curve.setSource(this.getFirstPoint().getPosition());
            curve.setTarget(this.getLastPoint().getPosition());
            curve.setSourceControl(this.getFirstPoint().getPosition().clone());
            curve.setTargetControl(this.getLastPoint().getPosition().clone());
            if (this.sourcePort) {
                curve.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort()));
            }
            if (this.targetPort) {
                curve.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort()));
            }
            return curve.getSVGCurve();
        }
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { width: this.options.width, color: this.options.color, curvyness: this.options.curvyness, selectedColor: this.options.selectedColor });
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.color = event.data.color;
        this.options.width = event.data.width;
        this.options.curvyness = event.data.curvyness;
        this.options.selectedColor = event.data.selectedColor;
    }
    addLabel(label) {
        if (label instanceof react_diagrams_core_1.LabelModel) {
            return super.addLabel(label);
        }
        let labelOb = new DefaultLabelModel_1.DefaultLabelModel();
        labelOb.setLabel(label);
        return super.addLabel(labelOb);
    }
    setWidth(width) {
        this.options.width = width;
        this.fireEvent({ width }, 'widthChanged');
    }
    setColor(color) {
        this.options.color = color;
        this.fireEvent({ color }, 'colorChanged');
    }
}
exports.DefaultLinkModel = DefaultLinkModel;
//# sourceMappingURL=DefaultLinkModel.js.map