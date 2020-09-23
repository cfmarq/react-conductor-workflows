"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DagreEngine = void 0;
const react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
const dagre = require("dagre");
const _ = require("lodash");
const geometry_1 = require("@projectstorm/geometry");
class DagreEngine {
    constructor(options = {}) {
        this.options = options;
    }
    redistribute(model) {
        // Create a new directed graph
        var g = new dagre.graphlib.Graph({
            multigraph: true
        });
        g.setGraph(this.options.graph || {});
        g.setDefaultEdgeLabel(function () {
            return {};
        });
        const processedlinks = {};
        // set nodes
        _.forEach(model.getNodes(), (node) => {
            g.setNode(node.getID(), { width: node.width, height: node.height });
        });
        _.forEach(model.getLinks(), (link) => {
            // set edges
            if (link.getSourcePort() && link.getTargetPort()) {
                processedlinks[link.getID()] = true;
                g.setEdge({
                    v: link.getSourcePort().getNode().getID(),
                    w: link.getTargetPort().getNode().getID(),
                    name: link.getID()
                });
            }
        });
        // layout the graph
        dagre.layout(g);
        g.nodes().forEach((v) => {
            const node = g.node(v);
            model.getNode(v).setPosition(node.x - node.width / 2, node.y - node.height / 2);
        });
        // also include links?
        if (this.options.includeLinks) {
            g.edges().forEach((e) => {
                const edge = g.edge(e);
                const link = model.getLink(e.name);
                const points = [link.getFirstPoint()];
                for (let i = 1; i < edge.points.length - 2; i++) {
                    points.push(new react_diagrams_core_1.PointModel({ link: link, position: new geometry_1.Point(edge.points[i].x, edge.points[i].y) }));
                }
                link.setPoints(points.concat(link.getLastPoint()));
            });
        }
    }
}
exports.DagreEngine = DagreEngine;
//# sourceMappingURL=DagreEngine.js.map