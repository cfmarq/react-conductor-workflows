"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultNodeModel = void 0;
const _ = require("lodash");
const react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
const DefaultPortModel_1 = require("../port/DefaultPortModel");
class DefaultNodeModel extends react_diagrams_core_1.NodeModel {
    constructor(options = {}, color) {
        if (typeof options === 'string') {
            options = {
                name: options,
                color: color
            };
        }
        super(Object.assign({ type: 'default', name: 'Untitled', color: 'rgb(0,192,255)' }, options));
        this.portsOut = [];
        this.portsIn = [];
    }
    doClone(lookupTable, clone) {
        clone.portsIn = [];
        clone.portsOut = [];
        super.doClone(lookupTable, clone);
    }
    removePort(port) {
        super.removePort(port);
        if (port.getOptions().in) {
            this.portsIn.splice(this.portsIn.indexOf(port), 1);
        }
        else {
            this.portsOut.splice(this.portsOut.indexOf(port), 1);
        }
    }
    addPort(port) {
        super.addPort(port);
        if (port.getOptions().in) {
            if (this.portsIn.indexOf(port) === -1) {
                this.portsIn.push(port);
            }
        }
        else {
            if (this.portsOut.indexOf(port) === -1) {
                this.portsOut.push(port);
            }
        }
        return port;
    }
    addInPort(label, after = true) {
        const p = new DefaultPortModel_1.DefaultPortModel({
            in: true,
            name: label,
            label: label,
            alignment: react_diagrams_core_1.PortModelAlignment.LEFT
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    }
    addOutPort(label, after = true) {
        const p = new DefaultPortModel_1.DefaultPortModel({
            in: false,
            name: label,
            label: label,
            alignment: react_diagrams_core_1.PortModelAlignment.RIGHT
        });
        if (!after) {
            this.portsOut.splice(0, 0, p);
        }
        return this.addPort(p);
    }
    deserialize(event) {
        super.deserialize(event);
        this.options.name = event.data.name;
        this.options.color = event.data.color;
        this.portsIn = _.map(event.data.portsInOrder, (id) => {
            return this.getPortFromID(id);
        });
        this.portsOut = _.map(event.data.portsOutOrder, (id) => {
            return this.getPortFromID(id);
        });
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { name: this.options.name, color: this.options.color, portsInOrder: _.map(this.portsIn, (port) => {
                return port.getID();
            }), portsOutOrder: _.map(this.portsOut, (port) => {
                return port.getID();
            }) });
    }
    getInPorts() {
        return this.portsIn;
    }
    getOutPorts() {
        return this.portsOut;
    }
}
exports.DefaultNodeModel = DefaultNodeModel;
//# sourceMappingURL=DefaultNodeModel.js.map