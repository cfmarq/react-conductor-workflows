"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var React = require("react");
var styled_components_1 = require("styled-components");
var CustomButton = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    &.primary {\n      background-color: #ff7249;\n      color: white;\n      padding: 11px 32px 13px 32px;\n      margin-left: 15px;\n    }\n\n    &.cancel {\n      background-color: #eaeaea;\n      box-shadow: none;\n      color: #417fa6;\n      margin-left: 40px;\n    }\n\n    &:hover {\n      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);\n    }\n\n    border: none;\n    border-radius: 8px;\n    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.24);\n    box-sizing: border-box;\n    cursor: pointer;\n    display: inline-block;\n    font-family: inherit;\n    font-size: 16px;\n    font-weight: $bold;\n    line-height: 19px;\n    padding: 11px 24px 13px 24px;\n    text-align: center;\n"], ["\n\n    &.primary {\n      background-color: #ff7249;\n      color: white;\n      padding: 11px 32px 13px 32px;\n      margin-left: 15px;\n    }\n\n    &.cancel {\n      background-color: #eaeaea;\n      box-shadow: none;\n      color: #417fa6;\n      margin-left: 40px;\n    }\n\n    &:hover {\n      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);\n    }\n\n    border: none;\n    border-radius: 8px;\n    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.24);\n    box-sizing: border-box;\n    cursor: pointer;\n    display: inline-block;\n    font-family: inherit;\n    font-size: 16px;\n    font-weight: $bold;\n    line-height: 19px;\n    padding: 11px 24px 13px 24px;\n    text-align: center;\n"])));
exports.Button = function (_a) {
    var _b = _a.children, children = _b === void 0 ? "button" : _b, _c = _a.type, type = _c === void 0 ? "primary" : _c, onClick = _a.onClick;
    return (React.createElement(CustomButton, { onClick: onClick, className: type }, children));
};
var templateObject_1;
//# sourceMappingURL=Button.js.map