"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const ml_matrix_1 = require("ml-matrix");
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    translate(x, y) {
        this.x += x;
        this.y += y;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    toSVG() {
        return this.x + ' ' + this.y;
    }
    asMatrix() {
        return new ml_matrix_1.Matrix([[this.x], [this.y], [1]]);
    }
    transform(matrix) {
        let final = matrix.mmul(this.asMatrix());
        this.x = final.get(0, 0);
        this.y = final.get(1, 0);
    }
    static middlePoint(pointA, pointB) {
        return new Point((pointB.x + pointA.x) / 2, (pointB.y + pointA.y) / 2);
    }
    static multiply(...matrices) {
        let m = matrices[0];
        for (let i = 1; i < matrices.length; i++) {
            m = m.mmul(matrices[i]);
        }
        return m;
    }
    static scaleMatrix(x, y) {
        return new ml_matrix_1.Matrix([
            [x, 0, 0],
            [0, y, 0],
            [0, 0, 1]
        ]);
    }
    static translateMatrix(x, y) {
        return new ml_matrix_1.Matrix([
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1]
        ]);
    }
    static rotateMatrix(deg) {
        return new ml_matrix_1.Matrix([
            [Math.cos(deg), -1 * Math.sin(deg), 0],
            [Math.sin(deg), Math.cos(deg), 0],
            [0, 0, 1]
        ]);
    }
    static createScaleMatrix(x, y, origin) {
        return this.multiply(Point.translateMatrix(origin.x, origin.y), Point.scaleMatrix(x, y), Point.translateMatrix(-origin.x, -origin.y));
    }
    static createRotateMatrix(deg, origin) {
        return this.multiply(Point.translateMatrix(origin.x, origin.y), Point.rotateMatrix(deg), Point.translateMatrix(-origin.x, -origin.y));
    }
}
exports.Point = Point;
//# sourceMappingURL=Point.js.map