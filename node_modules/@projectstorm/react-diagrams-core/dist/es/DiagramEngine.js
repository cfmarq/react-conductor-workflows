"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramEngine = void 0;
const NodeModel_1 = require("./entities/node/NodeModel");
const geometry_1 = require("@projectstorm/geometry");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
/**
 * Passed as a parameter to the DiagramWidget
 */
class DiagramEngine extends react_canvas_core_1.CanvasEngine {
    constructor(options = {}) {
        super(options);
        this.maxNumberPointsPerLink = 1000;
        // create banks for the different factory types
        this.nodeFactories = new react_canvas_core_1.FactoryBank();
        this.linkFactories = new react_canvas_core_1.FactoryBank();
        this.portFactories = new react_canvas_core_1.FactoryBank();
        this.labelFactories = new react_canvas_core_1.FactoryBank();
        const setup = (factory) => {
            factory.registerListener({
                factoryAdded: (event) => {
                    event.factory.setDiagramEngine(this);
                },
                factoryRemoved: (event) => {
                    event.factory.setDiagramEngine(null);
                }
            });
        };
        setup(this.nodeFactories);
        setup(this.linkFactories);
        setup(this.portFactories);
        setup(this.labelFactories);
    }
    /**
     * Gets a model and element under the mouse cursor
     */
    getMouseElement(event) {
        var target = event.target;
        var diagramModel = this.model;
        //is it a port
        var element = react_canvas_core_1.Toolkit.closest(target, '.port[data-name]');
        if (element) {
            var nodeElement = react_canvas_core_1.Toolkit.closest(target, '.node[data-nodeid]');
            return diagramModel.getNode(nodeElement.getAttribute('data-nodeid')).getPort(element.getAttribute('data-name'));
        }
        //look for a point
        element = react_canvas_core_1.Toolkit.closest(target, '.point[data-id]');
        if (element) {
            return diagramModel.getLink(element.getAttribute('data-linkid')).getPointModel(element.getAttribute('data-id'));
        }
        //look for a link
        element = react_canvas_core_1.Toolkit.closest(target, '[data-linkid]');
        if (element) {
            return diagramModel.getLink(element.getAttribute('data-linkid'));
        }
        //look for a node
        element = react_canvas_core_1.Toolkit.closest(target, '.node[data-nodeid]');
        if (element) {
            return diagramModel.getNode(element.getAttribute('data-nodeid'));
        }
        return null;
    }
    //!-------------- FACTORIES ------------
    getNodeFactories() {
        return this.nodeFactories;
    }
    getLinkFactories() {
        return this.linkFactories;
    }
    getLabelFactories() {
        return this.labelFactories;
    }
    getPortFactories() {
        return this.portFactories;
    }
    getFactoryForNode(node) {
        if (typeof node === 'string') {
            return this.nodeFactories.getFactory(node);
        }
        return this.nodeFactories.getFactory(node.getType());
    }
    getFactoryForLink(link) {
        if (typeof link === 'string') {
            return this.linkFactories.getFactory(link);
        }
        return this.linkFactories.getFactory(link.getType());
    }
    getFactoryForLabel(label) {
        if (typeof label === 'string') {
            return this.labelFactories.getFactory(label);
        }
        return this.labelFactories.getFactory(label.getType());
    }
    getFactoryForPort(port) {
        if (typeof port === 'string') {
            return this.portFactories.getFactory(port);
        }
        return this.portFactories.getFactory(port.getType());
    }
    generateWidgetForLink(link) {
        return this.getFactoryForLink(link).generateReactWidget({ model: link });
    }
    generateWidgetForNode(node) {
        return this.getFactoryForNode(node).generateReactWidget({ model: node });
    }
    getNodeElement(node) {
        const selector = this.canvas.querySelector(`.node[data-nodeid="${node.getID()}"]`);
        if (selector === null) {
            throw new Error('Cannot find Node element with nodeID: [' + node.getID() + ']');
        }
        return selector;
    }
    getNodePortElement(port) {
        var selector = this.canvas.querySelector(`.port[data-name="${port.getName()}"][data-nodeid="${port.getParent().getID()}"]`);
        if (selector === null) {
            throw new Error('Cannot find Node Port element with nodeID: [' +
                port.getParent().getID() +
                '] and name: [' +
                port.getName() +
                ']');
        }
        return selector;
    }
    getPortCenter(port) {
        return this.getPortCoords(port).getOrigin();
    }
    /**
     * Calculate rectangular coordinates of the port passed in.
     */
    getPortCoords(port, element) {
        if (!this.canvas) {
            throw new Error('Canvas needs to be set first');
        }
        if (!element) {
            element = this.getNodePortElement(port);
        }
        const sourceRect = element.getBoundingClientRect();
        const point = this.getRelativeMousePoint({
            clientX: sourceRect.left,
            clientY: sourceRect.top
        });
        const zoom = this.model.getZoomLevel() / 100.0;
        return new geometry_1.Rectangle(point.x, point.y, sourceRect.width / zoom, sourceRect.height / zoom);
    }
    /**
     * Determine the width and height of the node passed in.
     * It currently assumes nodes have a rectangular shape, can be overriden for customised shapes.
     */
    getNodeDimensions(node) {
        if (!this.canvas) {
            return {
                width: 0,
                height: 0
            };
        }
        const nodeElement = this.getNodeElement(node);
        const nodeRect = nodeElement.getBoundingClientRect();
        return {
            width: nodeRect.width,
            height: nodeRect.height
        };
    }
    /**
     * Get nodes bounding box coordinates with or without margin
     * @returns rectangle points in node layer coordinates
     */
    getBoundingNodesRect(nodes, margin) {
        if (nodes) {
            if (nodes.length === 0) {
                return new geometry_1.Rectangle(0, 0, 0, 0);
            }
            let boundingBox = geometry_1.Polygon.boundingBoxFromPolygons(nodes.map((node) => node.getBoundingBox()));
            if (margin) {
                return new geometry_1.Rectangle(boundingBox.getTopLeft().x - margin, boundingBox.getTopLeft().y - margin, boundingBox.getWidth() + 2 * margin, boundingBox.getHeight() + 2 * margin);
            }
            return boundingBox;
        }
    }
    zoomToFitNodes(margin) {
        let nodesRect; // nodes bounding rectangle
        let selectedNodes = this.model
            .getSelectedEntities()
            .filter((entity) => entity instanceof NodeModel_1.NodeModel)
            .map((node) => node);
        // no node selected
        if (selectedNodes.length == 0) {
            let allNodes = this.model
                .getSelectionEntities()
                .filter((entity) => entity instanceof NodeModel_1.NodeModel)
                .map((node) => node);
            // get nodes bounding box with margin
            nodesRect = this.getBoundingNodesRect(allNodes, margin);
        }
        else {
            // get nodes bounding box with margin
            nodesRect = this.getBoundingNodesRect(selectedNodes, margin);
        }
        if (nodesRect) {
            // there is something we should zoom on
            let canvasRect = this.canvas.getBoundingClientRect();
            let canvasTopLeftPoint = {
                x: canvasRect.left,
                y: canvasRect.top
            };
            let nodeLayerTopLeftPoint = {
                x: canvasTopLeftPoint.x + this.getModel().getOffsetX(),
                y: canvasTopLeftPoint.y + this.getModel().getOffsetY()
            };
            const xFactor = this.canvas.clientWidth / nodesRect.getWidth();
            const yFactor = this.canvas.clientHeight / nodesRect.getHeight();
            const zoomFactor = xFactor < yFactor ? xFactor : yFactor;
            this.model.setZoomLevel(zoomFactor * 100);
            let nodesRectTopLeftPoint = {
                x: nodeLayerTopLeftPoint.x + nodesRect.getTopLeft().x * zoomFactor,
                y: nodeLayerTopLeftPoint.y + nodesRect.getTopLeft().y * zoomFactor
            };
            this.model.setOffset(this.model.getOffsetX() + canvasTopLeftPoint.x - nodesRectTopLeftPoint.x, this.model.getOffsetY() + canvasTopLeftPoint.y - nodesRectTopLeftPoint.y);
            this.repaintCanvas();
        }
    }
    getMaxNumberPointsPerLink() {
        return this.maxNumberPointsPerLink;
    }
    setMaxNumberPointsPerLink(max) {
        this.maxNumberPointsPerLink = max;
    }
}
exports.DiagramEngine = DiagramEngine;
//# sourceMappingURL=DiagramEngine.js.map