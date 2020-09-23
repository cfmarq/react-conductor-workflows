"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const Point_1 = require("./Point");
const Polygon_1 = require("./Polygon");
class Rectangle extends Polygon_1.Polygon {
    constructor(a = 0, b = 0, c = 0, d = 0) {
        if (a instanceof Point_1.Point && b instanceof Point_1.Point && c instanceof Point_1.Point && d instanceof Point_1.Point) {
            super([a, b, c, d]);
        }
        else if (a instanceof Point_1.Point) {
            super([a, new Point_1.Point(a.x + b, a.y), new Point_1.Point(a.x + b, a.y + c), new Point_1.Point(a.x, a.y + c)]);
        }
        else {
            super(Rectangle.pointsFromBounds(a, b, c, d));
        }
    }
    static pointsFromBounds(x, y, width, height) {
        return [new Point_1.Point(x, y), new Point_1.Point(x + width, y), new Point_1.Point(x + width, y + height), new Point_1.Point(x, y + height)];
    }
    updateDimensions(x, y, width, height) {
        this.points = Rectangle.pointsFromBounds(x, y, width, height);
    }
    setPoints(points) {
        if (points.length !== 4) {
            throw 'Rectangles must always have 4 points';
        }
        super.setPoints(points);
    }
    containsPoint(point) {
        const tl = this.getTopLeft();
        const br = this.getBottomRight();
        return point.x >= tl.x && point.x <= br.x && point.y >= tl.y && point.y <= br.y;
    }
    getWidth() {
        return Math.sqrt(Math.pow(this.getTopLeft().x - this.getTopRight().x, 2) + Math.pow(this.getTopLeft().y - this.getTopRight().y, 2));
    }
    getHeight() {
        return Math.sqrt(Math.pow(this.getBottomLeft().x - this.getTopLeft().x, 2) +
            Math.pow(this.getBottomLeft().y - this.getTopLeft().y, 2));
    }
    getTopMiddle() {
        return Point_1.Point.middlePoint(this.getTopLeft(), this.getTopRight());
    }
    getBottomMiddle() {
        return Point_1.Point.middlePoint(this.getBottomLeft(), this.getBottomRight());
    }
    getLeftMiddle() {
        return Point_1.Point.middlePoint(this.getBottomLeft(), this.getTopLeft());
    }
    getRightMiddle() {
        return Point_1.Point.middlePoint(this.getBottomRight(), this.getTopRight());
    }
    getTopLeft() {
        return this.points[0];
    }
    getTopRight() {
        return this.points[1];
    }
    getBottomRight() {
        return this.points[2];
    }
    getBottomLeft() {
        return this.points[3];
    }
}
exports.Rectangle = Rectangle;
//# sourceMappingURL=Rectangle.js.map