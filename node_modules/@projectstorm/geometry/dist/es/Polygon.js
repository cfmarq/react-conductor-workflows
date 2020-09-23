"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const Point_1 = require("./Point");
const _ = require("lodash");
class Polygon {
    constructor(points = []) {
        this.points = points;
    }
    serialize() {
        return _.map(this.points, (point) => {
            return [point.x, point.y];
        });
    }
    deserialize(data) {
        this.points = _.map(data, (point) => {
            return new Point_1.Point(point[0], point[1]);
        });
    }
    scale(x, y, origin) {
        let matrix = Point_1.Point.createScaleMatrix(x, y, origin);
        _.forEach(this.points, (point) => {
            point.transform(matrix);
        });
    }
    transform(matrix) {
        _.forEach(this.points, (point) => {
            point.transform(matrix);
        });
    }
    setPoints(points) {
        this.points = points;
    }
    getPoints() {
        return this.points;
    }
    rotate(degrees) {
        this.transform(Point_1.Point.createRotateMatrix(degrees / (180 / Math.PI), this.getOrigin()));
    }
    translate(offsetX, offsetY) {
        _.forEach(this.points, (point) => {
            point.translate(offsetX, offsetY);
        });
    }
    doClone(ob) {
        this.points = _.map(ob.points, (point) => {
            return point.clone();
        });
    }
    clone() {
        let ob = Object.create(this);
        ob.doClone(this);
        return ob;
    }
    getOrigin() {
        if (this.points.length === 0) {
            return null;
        }
        let dimensions = this.getBoundingBox();
        return Point_1.Point.middlePoint(dimensions.getTopLeft(), dimensions.getBottomRight());
    }
    static boundingBoxFromPolygons(polygons) {
        return Polygon.boundingBoxFromPoints(_.flatMap(polygons, (polygon) => {
            return polygon.getPoints();
        }));
    }
    static boundingBoxFromPoints(points) {
        if (points.length === 0) {
            return new Rectangle_1.Rectangle(0, 0, 0, 0);
        }
        let minX = points[0].x;
        let maxX = points[0].x;
        let minY = points[0].y;
        let maxY = points[0].y;
        for (let i = 1; i < points.length; i++) {
            if (points[i].x < minX) {
                minX = points[i].x;
            }
            if (points[i].x > maxX) {
                maxX = points[i].x;
            }
            if (points[i].y < minY) {
                minY = points[i].y;
            }
            if (points[i].y > maxY) {
                maxY = points[i].y;
            }
        }
        return new Rectangle_1.Rectangle(new Point_1.Point(minX, minY), new Point_1.Point(maxX, minY), new Point_1.Point(maxX, maxY), new Point_1.Point(minX, maxY));
    }
    getBoundingBox() {
        let minX = this.points[0].x;
        let maxX = this.points[0].x;
        let minY = this.points[0].y;
        let maxY = this.points[0].y;
        for (let i = 1; i < this.points.length; i++) {
            if (this.points[i].x < minX) {
                minX = this.points[i].x;
            }
            if (this.points[i].x > maxX) {
                maxX = this.points[i].x;
            }
            if (this.points[i].y < minY) {
                minY = this.points[i].y;
            }
            if (this.points[i].y > maxY) {
                maxY = this.points[i].y;
            }
        }
        return new Rectangle_1.Rectangle(new Point_1.Point(minX, minY), new Point_1.Point(maxX, minY), new Point_1.Point(maxX, maxY), new Point_1.Point(minX, maxY));
    }
}
exports.Polygon = Polygon;
const Rectangle_1 = require("./Rectangle");
//# sourceMappingURL=Polygon.js.map