"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BezierCurve = exports.BezierCurvepPoints = void 0;
const Point_1 = require("./Point");
const Polygon_1 = require("./Polygon");
var BezierCurvepPoints;
(function (BezierCurvepPoints) {
    BezierCurvepPoints[BezierCurvepPoints["SOURCE"] = 0] = "SOURCE";
    BezierCurvepPoints[BezierCurvepPoints["SOURCE_CONTROL"] = 1] = "SOURCE_CONTROL";
    BezierCurvepPoints[BezierCurvepPoints["TARGET_CONTROL"] = 2] = "TARGET_CONTROL";
    BezierCurvepPoints[BezierCurvepPoints["TARGET"] = 3] = "TARGET";
})(BezierCurvepPoints = exports.BezierCurvepPoints || (exports.BezierCurvepPoints = {}));
class BezierCurve extends Polygon_1.Polygon {
    constructor() {
        super([new Point_1.Point(0, 0), new Point_1.Point(0, 0), new Point_1.Point(0, 0), new Point_1.Point(0, 0)]);
    }
    getSVGCurve() {
        return `M${this.getSource().toSVG()} C${this.getSourceControl().toSVG()}, ${this.getTargetControl().toSVG()}, ${this.getTarget().toSVG()}`;
    }
    setPoints(points) {
        if (points.length !== 4) {
            throw new Error('BezierCurve must have extactly 4 points');
        }
        super.setPoints(points);
    }
    getSource() {
        return this.points[BezierCurvepPoints.SOURCE];
    }
    getSourceControl() {
        return this.points[BezierCurvepPoints.SOURCE_CONTROL];
    }
    getTargetControl() {
        return this.points[BezierCurvepPoints.TARGET_CONTROL];
    }
    getTarget() {
        return this.points[BezierCurvepPoints.TARGET];
    }
    setSource(point) {
        this.points[BezierCurvepPoints.SOURCE] = point;
    }
    setSourceControl(point) {
        this.points[BezierCurvepPoints.SOURCE_CONTROL] = point;
    }
    setTargetControl(point) {
        this.points[BezierCurvepPoints.TARGET_CONTROL] = point;
    }
    setTarget(point) {
        this.points[BezierCurvepPoints.TARGET] = point;
    }
}
exports.BezierCurve = BezierCurve;
//# sourceMappingURL=BezierCurve.js.map