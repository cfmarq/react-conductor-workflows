"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPortModel = void 0;
const react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
const DefaultLinkModel_1 = require("../link/DefaultLinkModel");
class DefaultPortModel extends react_diagrams_core_1.PortModel {
    constructor(options, name, label) {
        if (!!name) {
            options = {
                in: !!options,
                name: name,
                label: label
            };
        }
        options = options;
        super(Object.assign({ label: options.label || options.name, alignment: options.in ? react_diagrams_core_1.PortModelAlignment.LEFT : react_diagrams_core_1.PortModelAlignment.RIGHT, type: 'default' }, options));
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.in = event.data.in;
        this.options.label = event.data.label;
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { in: this.options.in, label: this.options.label });
    }
    link(port, factory) {
        let link = this.createLinkModel(factory);
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link;
    }
    canLinkToPort(port) {
        if (port instanceof DefaultPortModel) {
            return this.options.in !== port.getOptions().in;
        }
        return true;
    }
    createLinkModel(factory) {
        let link = super.createLinkModel();
        if (!link && factory) {
            return factory.generateModel({});
        }
        return link || new DefaultLinkModel_1.DefaultLinkModel();
    }
}
exports.DefaultPortModel = DefaultPortModel;
//# sourceMappingURL=DefaultPortModel.js.map