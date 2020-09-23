"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeModel = void 0;
const _ = require("lodash");
const geometry_1 = require("@projectstorm/geometry");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
class NodeModel extends react_canvas_core_1.BasePositionModel {
    constructor(options) {
        super(options);
        this.ports = {};
        this.width = 0;
        this.height = 0;
    }
    getBoundingBox() {
        return new geometry_1.Rectangle(this.getPosition(), this.width, this.height);
    }
    setPosition(x, y) {
        let old = this.position;
        super.setPosition(x, y);
        //also update the port co-ordinates (for make glorious speed)
        _.forEach(this.ports, (port) => {
            port.setPosition(port.getX() + x - old.x, port.getY() + y - old.y);
        });
    }
    deserialize(event) {
        super.deserialize(event);
        //deserialize ports
        _.forEach(event.data.ports, (port) => {
            let portOb = event.engine.getFactoryForPort(port.type).generateModel({});
            portOb.deserialize(Object.assign(Object.assign({}, event), { data: port }));
            // the links need these
            event.registerModel(portOb);
            this.addPort(portOb);
        });
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { ports: _.map(this.ports, (port) => {
                return port.serialize();
            }) });
    }
    doClone(lookupTable = {}, clone) {
        // also clone the ports
        clone.ports = {};
        _.forEach(this.ports, (port) => {
            clone.addPort(port.clone(lookupTable));
        });
    }
    remove() {
        super.remove();
        _.forEach(this.ports, (port) => {
            _.forEach(port.getLinks(), (link) => {
                link.remove();
            });
        });
    }
    getPortFromID(id) {
        for (var i in this.ports) {
            if (this.ports[i].getID() === id) {
                return this.ports[i];
            }
        }
        return null;
    }
    getLink(id) {
        for (let portID in this.ports) {
            const links = this.ports[portID].getLinks();
            if (links[id]) {
                return links[id];
            }
        }
    }
    getPort(name) {
        return this.ports[name];
    }
    getPorts() {
        return this.ports;
    }
    removePort(port) {
        // clear the port from the links
        for (let link of _.values(port.getLinks())) {
            link.clearPort(port);
        }
        //clear the parent node reference
        if (this.ports[port.getName()]) {
            this.ports[port.getName()].setParent(null);
            delete this.ports[port.getName()];
        }
    }
    addPort(port) {
        port.setParent(this);
        this.ports[port.getName()] = port;
        return port;
    }
    updateDimensions({ width, height }) {
        this.width = width;
        this.height = height;
    }
}
exports.NodeModel = NodeModel;
//# sourceMappingURL=NodeModel.js.map