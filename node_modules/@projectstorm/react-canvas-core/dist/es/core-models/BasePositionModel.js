"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePositionModel = void 0;
const BaseModel_1 = require("./BaseModel");
const geometry_1 = require("@projectstorm/geometry");
class BasePositionModel extends BaseModel_1.BaseModel {
    constructor(options) {
        super(options);
        this.position = options.position || new geometry_1.Point(0, 0);
    }
    setPosition(x, y) {
        if (typeof x === 'object') {
            this.position = x;
        }
        else if (typeof x) {
            this.position = new geometry_1.Point(x, y);
        }
        this.fireEvent({}, 'positionChanged');
    }
    getBoundingBox() {
        return new geometry_1.Rectangle(this.position, 0, 0);
    }
    deserialize(event) {
        super.deserialize(event);
        this.position = new geometry_1.Point(event.data.x, event.data.y);
    }
    serialize() {
        return Object.assign(Object.assign({}, super.serialize()), { x: this.position.x, y: this.position.y });
    }
    getPosition() {
        return this.position;
    }
    getX() {
        return this.position.x;
    }
    getY() {
        return this.position.y;
    }
}
exports.BasePositionModel = BasePositionModel;
//# sourceMappingURL=BasePositionModel.js.map