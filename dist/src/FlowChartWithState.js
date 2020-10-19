"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowChartWithState = void 0;
var React = require("react");
var styled_components_1 = require("styled-components");
var mapValues_1 = require("./container/utils/mapValues");
var _1 = require("./");
var actions_1 = require("./container/actions");
var element_1 = require("./element");
var _2 = require("./");
var utils_1 = require("./utils");
require("./FlowChartWithState.css");
var ModelBox = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0\n  left: 0\n  background: rgba(9,30,66,.3);\n  z-index: 99;\n\n  &.hide {\n    display: none;\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0\n  left: 0\n  background: rgba(9,30,66,.3);\n  z-index: 99;\n\n  &.hide {\n    display: none;\n  }\n"])));
var ModelContent = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  animation-duration: 1s;\n  animation-name: slidein;\n  position: fixed;\n  width: 590px;\n  height: 100vh;\n  background: #fff;\n  float: right;\n  padding-left: 35px;\n  overflow: scroll;\n  right: 0;\n  top: 0;\n\n  @keyframes slidein {\n    from {\n      width: 20%;\n    }\n\n    to {\n      width: 590px;\n    }\n  }\n"], ["\n  animation-duration: 1s;\n  animation-name: slidein;\n  position: fixed;\n  width: 590px;\n  height: 100vh;\n  background: #fff;\n  float: right;\n  padding-left: 35px;\n  overflow: scroll;\n  right: 0;\n  top: 0;\n\n  @keyframes slidein {\n    from {\n      width: 20%;\n    }\n\n    to {\n      width: 590px;\n    }\n  }\n"])));
var PopupHeader = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 100px 15px 0px 15px;\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 22px;\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n"], ["\n  padding: 100px 15px 0px 15px;\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 22px;\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n"])));
var PopupSubHeader = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 10px 15px 0px 15px;\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 22px;\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n"], ["\n  padding: 10px 15px 0px 15px;\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 22px;\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n"])));
var PopupSubtitle = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: 20px 10px 0px 15px;\n  font-size: 14px;\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n"], ["\n  padding: 20px 10px 0px 15px;\n  font-size: 14px;\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n"])));
var ButtonBox = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 100px;\n  display: flex;\n  justify-content: flex-start;\n  width: 100%;\n  padding-right: 1rem;\n  text-align: center;\n  margin-right: 40px;\n  margin-bottom: 20px;\n  margin-top: 40px;\n  cursor: pointer;\n"], ["\n  width: 100px;\n  display: flex;\n  justify-content: flex-start;\n  width: 100%;\n  padding-right: 1rem;\n  text-align: center;\n  margin-right: 40px;\n  margin-bottom: 20px;\n  margin-top: 40px;\n  cursor: pointer;\n"])));
var InputBox = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: 20px;\n  margin: 20px 0 30px 0;\n  padding: 0 1rem;\n\n  & label {\n    display:block;\n    color: #88a5bf\n    font-size: 12px;\n    padding-bottom: 2px;\n  }\n\n  & input {\n    font-size: 14px;\n    display:block;\n    width: 300px;\n    padding-left: 0.5rem;\n    border: 1px solid #88A5BF;\n    border-radius: 8px;\n    &:focus {\n      outline: none;\n      box-shadow: 0 0 1px 1px #244e74;\n    }\n  }\n\n  & textarea {\n    font-size: 14px;\n    padding: 10px;\n    height: 100px;\n    width: 300px;\n    padding-left: 0.5rem;\n    border: 1px solid #88A5BF;\n    border-radius: 8px;\n    &:focus {\n      outline: none;\n      box-shadow: 0 0 1px 1px #244e74;\n    }\n  }\n"], ["\n  font-size: 20px;\n  margin: 20px 0 30px 0;\n  padding: 0 1rem;\n\n  & label {\n    display:block;\n    color: #88a5bf\n    font-size: 12px;\n    padding-bottom: 2px;\n  }\n\n  & input {\n    font-size: 14px;\n    display:block;\n    width: 300px;\n    padding-left: 0.5rem;\n    border: 1px solid #88A5BF;\n    border-radius: 8px;\n    &:focus {\n      outline: none;\n      box-shadow: 0 0 1px 1px #244e74;\n    }\n  }\n\n  & textarea {\n    font-size: 14px;\n    padding: 10px;\n    height: 100px;\n    width: 300px;\n    padding-left: 0.5rem;\n    border: 1px solid #88A5BF;\n    border-radius: 8px;\n    &:focus {\n      outline: none;\n      box-shadow: 0 0 1px 1px #244e74;\n    }\n  }\n"])));
var Input = styled_components_1.default.input(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  padding: 10px;\n  height: 40px;\n  border: 1px solid #88A5BF;\n  border-radius: 8px;\n  width: 100%;\n"], ["\n  padding: 10px;\n  height: 40px;\n  border: 1px solid #88A5BF;\n  border-radius: 8px;\n  width: 100%;\n"])));
var Label = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  position: absolute;\n  width: 80px;\n"], ["\n  position: absolute;\n  width: 80px;\n"])));
var ErrorLabel = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  color: #d63831;\n  font-size: 12px;\n"], ["\n  color: #d63831;\n  font-size: 12px;\n"])));
var LabelContent = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  padding: 5px 10px;\n  background: #88A5BF;\n  color: white;\n  border-radius: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 10px;\n  cursor: pointer;\n"], ["\n  padding: 5px 10px;\n  background: #88A5BF;\n  color: white;\n  border-radius: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 10px;\n  cursor: pointer;\n"])));
var PortDefaultOuter = styled_components_1.default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  width: 15px;\n  height: 15px;\n  border-radius: 20px;\n  background: #88A5BF;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  &:hover {\n    background: #88A5BF;\n  }\n  & svg {\n    width: 15px;\n    height: 15px;\n  }\n"], ["\n  width: 15px;\n  height: 15px;\n  border-radius: 20px;\n  background: #88A5BF;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  &:hover {\n    background: #88A5BF;\n  }\n  & svg {\n    width: 15px;\n    height: 15px;\n  }\n"])));
var ProcessQueue = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  width: 200px;\n  height: 120px;\n  position: absolute;\n  padding: 30px;\n  background: rgb(217, 207, 138);\n  color: white;\n  border-radius: 10px;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"], ["\n  width: 200px;\n  height: 120px;\n  position: absolute;\n  padding: 30px;\n  background: rgb(217, 207, 138);\n  color: white;\n  border-radius: 10px;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"])));
var SimpleTask = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  width: 120px;\n  height: 60px;\n  position: absolute;\n  padding: 15px;\n  font-size: 14px;\n  background: #417FA6;\n  border-radius: 4px;\n  color: white;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"], ["\n  width: 120px;\n  height: 60px;\n  position: absolute;\n  padding: 15px;\n  font-size: 14px;\n  background: #417FA6;\n  border-radius: 4px;\n  color: white;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"])));
var SystemTask = styled_components_1.default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  width: 120px;\n  height: 60px;\n  position: absolute;\n  padding: 15px;\n  font-size: 14px;\n  background: #417FA6;\n  border-radius: 50%;\n  color: white;\n  background: rgb(155, 127, 105);\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"], ["\n  width: 120px;\n  height: 60px;\n  position: absolute;\n  padding: 15px;\n  font-size: 14px;\n  background: #417FA6;\n  border-radius: 50%;\n  color: white;\n  background: rgb(155, 127, 105);\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"
    // const SystemTask = styled.div`
    //   position: absolute;
    //   height: 100px;
    //   width: 100px;
    //   text-align: center;
    //   padding-top: 10px;
    //   & div {
    //     color: white;
    //     font-size: 14px;
    //   }
    //   &:before {
    //     position: absolute;
    //     content: '';
    //     top: 0px;
    //     left: 0px;
    //     height: 100%;
    //     width: 100%;
    //     transform: rotateX(45deg) rotateZ(45deg);
    //     box-shadow: 0px 0px 12px gray;
    //     background: rgb(155, 127, 105);
    //     z-index: -1;
    //   }
    // }
    // `
])));
// const SystemTask = styled.div`
//   position: absolute;
//   height: 100px;
//   width: 100px;
//   text-align: center;
//   padding-top: 10px;
//   & div {
//     color: white;
//     font-size: 14px;
//   }
//   &:before {
//     position: absolute;
//     content: '';
//     top: 0px;
//     left: 0px;
//     height: 100%;
//     width: 100%;
//     transform: rotateX(45deg) rotateZ(45deg);
//     box-shadow: 0px 0px 12px gray;
//     background: rgb(155, 127, 105);
//     z-index: -1;
//   }
// }
// `
var StartPoint = styled_components_1.default.div(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(148, 80, 81);\n  color: white;\n  border-radius: 50%;\n"], ["\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(148, 80, 81);\n  color: white;\n  border-radius: 50%;\n"])));
var EndPoint = styled_components_1.default.div(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(110, 97, 107);\n  color: white;\n  border-radius: 50%;\n"], ["\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(110, 97, 107);\n  color: white;\n  border-radius: 50%;\n"])));
var NodeCustom = React.forwardRef(function (_a, ref) {
    var node = _a.node, children = _a.children, otherProps = __rest(_a, ["node", "children"]);
    switch (node.type) {
        case "start":
            return (React.createElement(StartPoint, __assign({ ref: ref }, otherProps), children));
        case "end":
            return (React.createElement(EndPoint, __assign({ ref: ref }, otherProps), children));
        case "simple-task":
            return (React.createElement(SimpleTask, __assign({ ref: ref }, otherProps), children));
        case "process-queue":
            return (React.createElement(ProcessQueue, __assign({ ref: ref }, otherProps), children));
        case "system-task":
            return (React.createElement(SystemTask, __assign({ ref: ref }, otherProps), children));
        default:
            return (React.createElement(SimpleTask, __assign({ ref: ref }, otherProps), children));
    }
});
var PortCustom = function (props) {
    return React.createElement(PortDefaultOuter, null);
};
var LinkCustom = function (props) {
    // console.log("----props---- ", props)
    var startPos = props.startPos, endPos = props.endPos, link = props.link, onLabelDoubleClick = props.onLabelDoubleClick;
    var _a = utils_1.generateLabelPosition(startPos, endPos), centerX = _a.centerX, centerY = _a.centerY;
    return (React.createElement(React.Fragment, null,
        React.createElement(_2.LinkDefault, __assign({}, props)),
        React.createElement(Label, { style: { left: centerX, top: centerY }, onDoubleClick: function () { onLabelDoubleClick({ linkId: link.id }); } }, props.link.properties && props.link.properties.label && (React.createElement(LabelContent, null, props.link.properties && props.link.properties.label)))));
};
var timer = null;
/**
 * Flow Chart With State
 */
var FlowChartWithState = /** @class */ (function (_super) {
    __extends(FlowChartWithState, _super);
    function FlowChartWithState(props) {
        var _this = _super.call(this, props) || this;
        _this.onNodeDoubleClick = function (_a) {
            var nodeId = _a.nodeId;
            var clickNodeProperties = _this.state.nodes[nodeId].properties;
            clickNodeProperties = !!clickNodeProperties ? clickNodeProperties : {};
            _this.setState({
                modelOption: "editNode",
                showModelName: "editNodeModel",
                clickNodeId: nodeId,
                nodeName: clickNodeProperties.name,
                nodeEnvVariables: clickNodeProperties.envVariables,
                nodeId: clickNodeProperties.Id,
                nodeTaskReferenceName: clickNodeProperties.taskReferenceName,
                nodeInputParameters: clickNodeProperties.inputParameters,
                nodeCaseValueParam: clickNodeProperties.caseValueParam,
                nodeDefaultExclusiveJoinTask: clickNodeProperties.defaultExclusiveJoinTask,
                nodeSchema: _this.state.nodes[nodeId].type,
                nodeTypeOption: !!clickNodeProperties.nodeType ? clickNodeProperties.nodeType : ""
            }, function () {
                _this.setState({
                    isModelShow: true
                });
            });
        };
        _this.onLabelDoubleClick = function (_a) {
            var linkId = _a.linkId;
            _this.setState(function (preState) {
                var preLabel = !!preState.links[linkId].properties && !!preState.links[linkId].properties.label ? preState.links[linkId].properties.label : "";
                return {
                    isModelShow: true,
                    showModelName: "newLinkModel",
                    linkLabel: preLabel,
                    modelOption: "editLabel",
                    clickLinkId: linkId
                };
            });
        };
        _this.stateActions = mapValues_1.default({
            onDragNode: actions_1.onDragNode, onDragCanvas: actions_1.onDragCanvas, onLinkStart: actions_1.onLinkStart, onLinkMove: actions_1.onLinkMove, onLinkComplete: actions_1.onLinkComplete,
            onLinkCancel: actions_1.onLinkCancel, onLinkMouseEnter: actions_1.onLinkMouseEnter, onLinkMouseLeave: actions_1.onLinkMouseLeave, onLinkClick: actions_1.onLinkClick,
            onCanvasClick: actions_1.onCanvasClick, onDeleteKey: actions_1.onDeleteKey, onNodeClick: actions_1.onNodeClick,
            onNodeSizeChange: actions_1.onNodeSizeChange, onPortPositionChange: actions_1.onPortPositionChange, onCanvasDrop: actions_1.onCanvasDrop,
            onNodeDoubleClick: _this.onNodeDoubleClick,
            onLabelDoubleClick: _this.onLabelDoubleClick
        }, function (func) { return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.setState(func.apply(void 0, args));
        }; });
        _this.hideModel = function () {
            _this.setState({
                isModelShow: false,
                nodeName: "",
                nodeEnvVariables: [],
                nodeId: "",
                nodeTaskReferenceName: "",
                nodeInputParameters: "",
                nodeCaseValueParam: "",
                nodeDefaultExclusiveJoinTask: "",
                linkLabel: ""
            });
        };
        _this.handleCancelEditNode = function () {
            _this.clearErrors();
            if (_this.state.modelOption === "addNode") {
                var _newNodeId_1 = _this.state.newNodeId;
                var _nodes_1 = {};
                var _preNodes_1 = [];
                Object.keys(_this.state.nodes).forEach(function (nodeId) {
                    if (nodeId !== _newNodeId_1) {
                        _nodes_1[nodeId] = _this.state.nodes[nodeId];
                    }
                });
                _this.state.preNodes.forEach(function (preNodeId) {
                    if (preNodeId !== _newNodeId_1) {
                        _preNodes_1.push(preNodeId);
                    }
                });
                _this.setState({
                    newNodeId: "",
                    nodes: _nodes_1,
                    nodeTypeOption: "",
                    nodeSchema: "",
                    preNodes: _preNodes_1
                });
            }
            _this.hideModel();
        };
        _this.handleDescriptionInput = function (e) {
            _this.setState({
                nodeId: e.currentTarget.value
            });
        };
        _this.handleTaskReferenceNameInput = function (e) {
            _this.setState({
                nodeTaskReferenceName: e.currentTarget.value
            });
        };
        _this.handleInputParametersInput = function (e) {
            _this.setState({
                nodeInputParameters: e.currentTarget.value
            });
        };
        _this.handleCaseValueParamInput = function (e) {
            _this.setState({
                nodeCaseValueParam: e.currentTarget.value
            });
        };
        _this.handleDefaultExclusiveJoinTaskInput = function (e) {
            _this.setState({
                nodeDefaultExclusiveJoinTask: e.currentTarget.value
            });
        };
        _this.handleLinkDescriptionInput = function (e) {
            _this.setState({
                linkLabel: e.currentTarget.value
            });
        };
        _this.clearErrors = function () {
            _this.setState({
                errors: {
                    name: "",
                    taskReferenceName: "",
                    inputParameters: "",
                    typeOption: ""
                }
            });
        };
        _this.setNodeInfo = function () {
            // console.log("nodeName: ", this.state.nodeName)
            var gotErrors = false;
            var errors = {
                name: "",
                taskReferenceName: "",
                inputParameters: "",
                typeOption: ""
            };
            if (_this.state.nodeName.trim() === "") {
                errors.name = "Name field is required";
                _this.setState({ errors: errors });
                gotErrors = true;
            }
            if (_this.state.nodeTaskReferenceName.trim() === "") {
                errors.taskReferenceName = "Task reference name field is required";
                _this.setState({ errors: errors });
                gotErrors = true;
            }
            if (_this.state.nodeTypeOption.trim() === "") {
                errors.typeOption = "Node type field is required";
                _this.setState({ errors: errors });
                gotErrors = true;
            }
            // if (this.state.nodeInputParameters.trim() === "") {
            //   errors.inputParameters = "Input parameters field is required";
            //   this.setState({errors: errors})
            //   gotErrors = true
            // }
            try {
                JSON.parse(_this.state.nodeInputParameters);
            }
            catch (e) {
                errors.inputParameters = "Input parameters field should receive a valid JSON";
                _this.setState({ errors: errors });
                gotErrors = true;
            }
            if (gotErrors)
                return false;
            //
            // if (this.state.nodeTypeOption === "DECISION") {
            //   if (this.state.nodeCaseValueParam.trim() === "") {
            //     this.warningMessage("Case value param field is required")
            //     return false
            //   }
            // }
            // if (this.state.nodeTypeOption === "EXCLUSIVE_JOIN") {
            //   if (this.state.nodeDefaultExclusiveJoinTask.trim() === "") {
            //     this.warningMessage("Default exclusive join task field is required")
            //     return false
            //   }
            // }
            var _nodes = _this.state.nodes;
            var _nodeId = _this.state.modelOption === "addNode" ? _this.state.newNodeId : _this.state.clickNodeId;
            _nodes[_nodeId].properties = {
                name: _this.state.nodeName,
                Id: _this.state.nodeId,
                envVariables: _this.state.nodeEnvVariables,
                taskReferenceName: _this.state.nodeTaskReferenceName,
                inputParameters: _this.state.nodeInputParameters,
                caseValueParam: _this.state.nodeCaseValueParam,
                defaultExclusiveJoinTask: _this.state.nodeDefaultExclusiveJoinTask,
                nodeType: _this.state.nodeTypeOption
            };
            _this.setState({
                nodes: _nodes,
                nodeSchema: _nodes[_nodeId].properties.type,
                isModelShow: false
            });
            return true;
        };
        _this.setLinkInfo = function () {
            var _links = _this.state.links;
            if (_this.state.modelOption === "editLabel") {
                _links[_this.state.clickLinkId].properties = {
                    label: _this.state.linkLabel
                };
            }
            else if (_this.state.modelOption === "addLabel") {
                _links[_this.state.newLinkId].properties = {
                    label: _this.state.linkLabel
                };
            }
            _this.setState({
                links: _links,
                isModelShow: false,
                linkLabel: ""
            });
        };
        _this.handleNodeTypeChange = function (value) {
            _this.setState({
                nodeTypeOption: value,
                nodeCaseValueParam: "",
                nodeInputParameters: "",
                nodeDefaultExclusiveJoinTask: ""
            });
        };
        _this.handleNodeNameChange = function (value) {
            _this.setState({
                nodeName: value
            });
        };
        _this.handleAddEnvVariable = function () {
            _this.setState({ nodeEnvVariables: __spreadArrays(_this.state.nodeEnvVariables, [{ key: "", value: "" }]) });
        };
        _this.handleEnvKey = function (e, index) {
            var nodeEnvVariables = __spreadArrays(_this.state.nodeEnvVariables);
            var item = __assign({}, nodeEnvVariables[index]);
            item.key = e.target.value;
            nodeEnvVariables[index] = item;
            _this.setState({ nodeEnvVariables: nodeEnvVariables });
        };
        _this.handleEnvValue = function (e, index) {
            var nodeEnvVariables = __spreadArrays(_this.state.nodeEnvVariables);
            var item = __assign({}, nodeEnvVariables[index]);
            item.value = e.target.value;
            nodeEnvVariables[index] = item;
            _this.setState({ nodeEnvVariables: nodeEnvVariables });
        };
        _this.removeVariable = function (index) {
            var nodeEnvVariables = __spreadArrays(_this.state.nodeEnvVariables);
            nodeEnvVariables.splice(index, 1);
            _this.setState({ nodeEnvVariables: nodeEnvVariables });
        };
        _this.renderAddNewNodeModel = function (type, mode) {
            var tasks = _this.props.tasks;
            var nodeEnvVariables = _this.state.nodeEnvVariables;
            var simpleTaskOptions = [
                {
                    rGuid: "SIMPLE",
                    rName: "SIMPLE"
                }
            ];
            var systemTaskOptions = [
                {
                    rGuid: "DECISION",
                    rName: "DECISION"
                },
                {
                    rGuid: "EXCLUSIVE_JOIN",
                    rName: "EXCLUSIVE_JOIN"
                },
            ];
            var options;
            if (type === "simple-task") {
                options = simpleTaskOptions;
            }
            else {
                options = systemTaskOptions;
            }
            return (React.createElement(React.Fragment, null,
                React.createElement(ModelBox, { className: _this.state.isModelShow ? "" : "hide" },
                    React.createElement(ModelContent, null,
                        React.createElement(PopupHeader, null, mode === "ADD" ?
                            React.createElement(React.Fragment, null, "Add element")
                            :
                                React.createElement(React.Fragment, null, "Edit element")),
                        React.createElement("div", { className: "InputBox" },
                            type === "simple-task" &&
                                React.createElement(InputBox, null,
                                    React.createElement("label", null, "Name"),
                                    React.createElement(element_1.Select, { optionList: tasks, value: _this.state.nodeName !== "" ? _this.state.nodeName : "", onChange: _this.handleNodeNameChange })),
                            type === "system-task" &&
                                React.createElement(InputBox, null,
                                    React.createElement("label", null, "Name"),
                                    React.createElement(Input, { className: _this.state.errors.name !== "" ? 'error' : '', onChange: function (e) { return _this.handleNodeNameChange(e.target.value); }, value: _this.state.nodeName, type: "text" }),
                                    _this.state.errors.name !== "" &&
                                        React.createElement(ErrorLabel, null, _this.state.errors.name)),
                            React.createElement(InputBox, null,
                                React.createElement("label", null, "Task Reference Name"),
                                React.createElement(Input, { className: _this.state.errors.taskReferenceName !== "" ? 'error' : '', onChange: _this.handleTaskReferenceNameInput, value: _this.state.nodeTaskReferenceName, type: "text" }),
                                _this.state.errors.taskReferenceName !== "" &&
                                    React.createElement(ErrorLabel, null, _this.state.errors.taskReferenceName)),
                            React.createElement(InputBox, null,
                                React.createElement("label", null, "Type"),
                                React.createElement(element_1.Select, { className: _this.state.errors.typeOption !== "" ? 'error' : '', optionList: options, value: _this.state.nodeTypeOption !== "" ? _this.state.nodeTypeOption : "", onChange: _this.handleNodeTypeChange }),
                                _this.state.errors.typeOption !== "" &&
                                    React.createElement(ErrorLabel, null, _this.state.errors.typeOption)),
                            React.createElement(InputBox, null,
                                React.createElement("label", null, "Input Parameters"),
                                React.createElement("textarea", { className: _this.state.errors.inputParameters !== "" ? 'error' : '', onChange: _this.handleInputParametersInput, value: _this.state.nodeInputParameters }),
                                _this.state.errors.inputParameters !== "" &&
                                    React.createElement(ErrorLabel, null, _this.state.errors.inputParameters)),
                            type === "system-task" &&
                                (React.createElement(React.Fragment, null,
                                    _this.state.nodeTypeOption === "DECISION" &&
                                        (React.createElement(InputBox, null,
                                            React.createElement("label", null, "Case Value Param"),
                                            React.createElement(Input, { onChange: _this.handleCaseValueParamInput, value: _this.state.nodeCaseValueParam, type: "text" }))),
                                    _this.state.nodeTypeOption === "EXCLUSIVE_JOIN" &&
                                        (React.createElement(InputBox, null,
                                            React.createElement("label", null, "Default Exclusive Join Task"),
                                            React.createElement(Input, { onChange: _this.handleDefaultExclusiveJoinTaskInput, value: _this.state.nodeDefaultExclusiveJoinTask, type: "text" }))))),
                            type === "simple-task" &&
                                React.createElement(React.Fragment, null,
                                    React.createElement(PopupSubHeader, null, "Environment variables"),
                                    nodeEnvVariables.map(function (item, i) {
                                        return (React.createElement(React.Fragment, null,
                                            i > 0 &&
                                                React.createElement(React.Fragment, null,
                                                    React.createElement("hr", { style: { width: "90%", color: "#88A5BF", backgroundColor: "#88A5BF", border: 0, height: 1 } })),
                                            React.createElement(PopupSubtitle, null,
                                                "Variable ",
                                                i + 1),
                                            React.createElement(InputBox, null,
                                                React.createElement("label", null, "Key"),
                                                React.createElement(Input, { onChange: function (value) { return _this.handleEnvKey(value, i); }, value: item.key, type: "text" })),
                                            React.createElement(InputBox, null,
                                                React.createElement("label", null, "Value"),
                                                React.createElement(Input, { onChange: function (value) { return _this.handleEnvValue(value, i); }, value: item.value, type: "text" })),
                                            React.createElement(element_1.Button, { onClick: function () { return _this.removeVariable(i); }, type: "remove" }, "Remove Variable")));
                                    }),
                                    React.createElement(element_1.Button, { onClick: _this.handleAddEnvVariable, type: "secondary" }, "Add Variable"))),
                        React.createElement(ButtonBox, null,
                            React.createElement(element_1.Button, { onClick: _this.setNodeInfo, type: "primary" }, "Confirm"),
                            React.createElement(element_1.Button, { onClick: _this.handleCancelEditNode, type: "cancel" }, "Cancel"))))));
        };
        _this.renderAddNewLinkModel = function () {
            if (_this.props.isAllowAddLinkLabel !== true) {
                return false;
            }
            return (React.createElement(ModelBox, { className: _this.state.isModelShow ? "" : "hide" },
                React.createElement(ModelContent, null,
                    React.createElement("div", { className: "InputBox" },
                        React.createElement(InputBox, null,
                            React.createElement("label", null, "Name:"),
                            React.createElement(Input, { onChange: _this.handleLinkDescriptionInput, value: _this.state.linkLabel, type: "text" }))),
                    React.createElement(ButtonBox, null,
                        React.createElement(element_1.Button, { onClick: _this.setLinkInfo, type: "primary" }, "Confirm"),
                        React.createElement(element_1.Button, { onClick: _this.hideModel, type: "cancel" }, "Cancel")))));
        };
        _this.warningMessage = function (content) {
            _this.setState(function (preState) { return ({
                alertMessageInfo: content,
                alertMessageStatus: "show",
            }); });
            clearTimeout(timer);
            timer = setTimeout(function () {
                _this.setState({
                    alertMessageStatus: "hide"
                });
            }, 2000);
        };
        _this.renderAlertMessage = function () {
            return (React.createElement(element_1.Message, { errorInfo: _this.state.alertMessageInfo, alertMessageStatus: _this.state.alertMessageStatus }));
        };
        _this.state = __assign(__assign({}, props.initialValue), { preNodes: Object.keys(props.initialValue.nodes), preLinks: Object.keys(props.initialValue.links), isModelShow: false, showModelName: "", nodeName: "", nodeEnvVariables: [], nodeId: "", nodeTaskReferenceName: "", nodeInputParameters: "", nodeCaseValueParam: "", nodeDefaultExclusiveJoinTask: "", nodeTypeOption: "", nodeSchema: "", linkLabel: "", newNodeId: "", clickNodeId: "", newLinkId: "", clickLinkId: "", modelOption: "addNode", alertMessageInfo: "", alertMessageStatus: "init", errors: {
                name: "",
                taskReferenceName: "",
                inputParameters: "",
                typeOption: ""
            } });
        return _this;
    }
    FlowChartWithState.prototype.componentDidUpdate = function () {
        //get work flow data
        var flowData = this.state;
        delete flowData.offset.node;
        for (var _i = 0, _a = Object.keys(flowData.nodes); _i < _a.length; _i++) {
            var key = _a[_i];
            var node = flowData.nodes[key];
            if (node.position && node.position.node) {
                delete node.position.node;
            }
        }
        // console.log("flow data: ", JSON.stringify(flowData))
        if (!!this.props.getWorkFlowChartValue) {
            this.props.getWorkFlowChartValue(flowData);
        }
        // when user add new link, he shold add the label of this link
        var addedLinkNumber = 0;
        for (var linkKey in this.state.links) {
            if (!!this.state.links[linkKey].to && !!this.state.links[linkKey].to.nodeId) {
                addedLinkNumber += 1;
            }
        }
        if (addedLinkNumber > this.state.preLinks.length) {
            var _preLinks_1 = this.state.preLinks;
            var _currentLinks = Object.keys(this.state.links);
            var _newLink = _currentLinks.filter(function (link) { return !_preLinks_1.includes(link); });
            this.setState({
                isModelShow: true,
                showModelName: "newLinkModel",
                modelOption: "addLabel",
                newLinkId: _newLink[0]
            });
        }
        if (addedLinkNumber != this.state.preLinks.length) {
            this.setState(function (preState) { return ({
                preLinks: Object.keys(preState.links)
            }); });
        }
        if (Object.keys(this.state.nodes).length > this.state.preNodes.length) {
            // console.log("Add Node");
            var preNodes_1 = this.state.preNodes;
            var currentNodes = Object.keys(this.state.nodes);
            var newNode = currentNodes.filter(function (node) { return !preNodes_1.includes(node); });
            this.setState({
                isModelShow: true,
                showModelName: "newNodeModel",
                modelOption: "addNode",
                newNodeId: newNode[0],
                nodeName: "",
                nodeEnvVariables: [],
                nodeId: "",
                nodeTaskReferenceName: "",
                nodeInputParameters: "",
                nodeCaseValueParam: "",
                nodeDefaultExclusiveJoinTask: ""
            });
        }
        if (Object.keys(this.state.nodes).length != this.state.preNodes.length) {
            this.setState(function (preState) { return ({
                preNodes: Object.keys(preState.nodes)
            }); });
        }
    };
    FlowChartWithState.prototype.render = function () {
        var config = this.props.config;
        var Components = {
            Port: PortCustom,
            Node: NodeCustom,
            Link: LinkCustom
        };
        return (React.createElement(React.Fragment, null,
            this.state.showModelName === "newNodeModel" ? this.renderAddNewNodeModel(Object.values(this.state.nodes)[Object.values(this.state.nodes).length - 1] !== undefined ? Object.values(this.state.nodes)[Object.values(this.state.nodes).length - 1].type : "", "ADD") : "",
            this.state.showModelName === "editNodeModel" ? this.renderAddNewNodeModel(this.state.nodeSchema, "EDIT") : "",
            this.state.showModelName === "newLinkModel" ? this.renderAddNewLinkModel() : "",
            this.renderAlertMessage(),
            React.createElement(_1.FlowChart, { chart: this.state, callbacks: this.stateActions, Components: Components, config: config, isAllowAddLinkLabel: !!this.props.isAllowAddLinkLabel })));
    };
    return FlowChartWithState;
}(React.Component));
exports.FlowChartWithState = FlowChartWithState;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17;
//# sourceMappingURL=FlowChartWithState.js.map