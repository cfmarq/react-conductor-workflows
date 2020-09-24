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
var ModelBox = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background: rgba(0,0,0,0.8);\n  z-index: 99;\n\n  &.hide {\n    display: none;\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background: rgba(0,0,0,0.8);\n  z-index: 99;\n\n  &.hide {\n    display: none;\n  }\n"])));
var ModelContent = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  width: 50%;\n  background: #fff;\n  margin: 10% auto;\n  border-radius: 10px;\n  padding: 0.5rem;\n"], ["\n  position: relative;\n  width: 50%;\n  background: #fff;\n  margin: 10% auto;\n  border-radius: 10px;\n  padding: 0.5rem;\n"])));
var ButtonBox = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100px;\n  display: flex;\n  justify-content: flex-end;\n  width: 100%;\n  padding-right: 1rem;\n  text-align: center;\n  margin-right: 40px;\n  margin-bottom: 20px;\n  cursor: pointer;\n"], ["\n  width: 100px;\n  display: flex;\n  justify-content: flex-end;\n  width: 100%;\n  padding-right: 1rem;\n  text-align: center;\n  margin-right: 40px;\n  margin-bottom: 20px;\n  cursor: pointer;\n"])));
var InputBox = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 20px 0;\n  padding: 0 1rem;\n\n  & label {\n    width: 20%;\n  }\n\n  & input {\n    width: 100%;\n    height: 30px;\n    padding-left: 0.5rem;\n  }\n"], ["\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 20px 0;\n  padding: 0 1rem;\n\n  & label {\n    width: 20%;\n  }\n\n  & input {\n    width: 100%;\n    height: 30px;\n    padding-left: 0.5rem;\n  }\n"])));
var Input = styled_components_1.default.input(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid cornflowerblue;\n  width: 100%;\n"], ["\n  padding: 10px;\n  border: 1px solid cornflowerblue;\n  width: 100%;\n"])));
var Label = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: absolute;\n  width: 120px;\n"], ["\n  position: absolute;\n  width: 120px;\n"])));
var LabelContent = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  padding: 5px 10px;\n  background: cornflowerblue;\n  color: white;\n  border-radius: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 10px;\n  cursor: pointer;\n"], ["\n  padding: 5px 10px;\n  background: cornflowerblue;\n  color: white;\n  border-radius: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 10px;\n  cursor: pointer;\n"])));
var PortDefaultOuter = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  width: 20px;\n  height: 20px;\n  border-radius: 20px;\n  background: cornflowerblue;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  &:hover {\n    background: cornflowerblue;\n  }\n  & svg {\n    width: 15px;\n    height: 15px;\n  }\n"], ["\n  width: 20px;\n  height: 20px;\n  border-radius: 20px;\n  background: cornflowerblue;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  &:hover {\n    background: cornflowerblue;\n  }\n  & svg {\n    width: 15px;\n    height: 15px;\n  }\n"])));
var ProcessQueue = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  width: 200px;\n  height: 120px;\n  position: absolute;\n  padding: 30px;\n  background: rgb(217, 207, 138);\n  color: white;\n  border-radius: 10px;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"], ["\n  width: 200px;\n  height: 120px;\n  position: absolute;\n  padding: 30px;\n  background: rgb(217, 207, 138);\n  color: white;\n  border-radius: 10px;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"])));
var SimpleTask = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  width: 200px;\n  height: 120px;\n  position: absolute;\n  padding: 30px;\n  background: #417FA6;\n  border-radius: 4px;\n  color: white;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"], ["\n  width: 200px;\n  height: 120px;\n  position: absolute;\n  padding: 30px;\n  background: #417FA6;\n  border-radius: 4px;\n  color: white;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"])));
var SystemTask = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  width: 200px;\n  height: 120px;\n  position: absolute;\n  padding: 30px;\n  background: rgb(155, 127, 105);\n  color: white;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"], ["\n  width: 200px;\n  height: 120px;\n  position: absolute;\n  padding: 30px;\n  background: rgb(155, 127, 105);\n  color: white;\n  & div {\n    padding: 0px;\n    margin: 0px;\n  }\n"])));
var StartPoint = styled_components_1.default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(148, 80, 81);\n  color: white;\n  border-radius: 50%;\n"], ["\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(148, 80, 81);\n  color: white;\n  border-radius: 50%;\n"])));
var EndPoint = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(110, 97, 107);\n  color: white;\n  border-radius: 50%;\n"], ["\n  position: absolute;\n  width: 100px;\n  height: 100px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgb(110, 97, 107);\n  color: white;\n  border-radius: 50%;\n"])));
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
                showModelName: "newNodeModel",
                clickNodeId: nodeId,
                nodeName: clickNodeProperties.name,
                nodeId: clickNodeProperties.Id,
                nodeTaskReferenceName: clickNodeProperties.taskReferenceName,
                nodeInputParameters: clickNodeProperties.inputParameters,
                nodeCaseValueParam: clickNodeProperties.caseValueParam,
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
                nodeId: "",
                nodeTaskReferenceName: "",
                nodeInputParameters: "",
                nodeCaseValueParam: "",
                linkLabel: ""
            });
        };
        _this.handleCancelEditNode = function () {
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
                    preNodes: _preNodes_1
                });
            }
            _this.hideModel();
        };
        _this.handleNameInput = function (e) {
            _this.setState({
                nodeName: e.currentTarget.value
            });
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
        _this.handleLinkDescriptionInput = function (e) {
            _this.setState({
                linkLabel: e.currentTarget.value
            });
        };
        _this.setNodeInfo = function () {
            // console.log("nodeName: ", this.state.nodeName)
            if (_this.state.nodeName.trim() === "") {
                _this.warningMessage("Please input the node name!");
                return false;
            }
            var _nodes = _this.state.nodes;
            var _nodeId = _this.state.modelOption === "addNode" ? _this.state.newNodeId : _this.state.clickNodeId;
            _nodes[_nodeId].properties = {
                name: _this.state.nodeName,
                Id: _this.state.nodeId,
                taskReferenceName: _this.state.nodeTaskReferenceName,
                inputParameters: _this.state.nodeInputParameters,
                caseValueParam: _this.state.nodeCaseValueParam,
                nodeType: _this.state.nodeTypeOption
            };
            _this.setState({
                nodes: _nodes,
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
            // console.log(value)
            _this.setState({
                nodeTypeOption: value
            });
        };
        _this.renderAddNewNodeModel = function () {
            //const { nodeTypeOptions = [] } = this.props
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
                    rGuid: "JOIN",
                    rName: "JOIN"
                },
            ];
            return (React.createElement(React.Fragment, null,
                React.createElement(ModelBox, { className: _this.state.isModelShow ? "" : "hide" },
                    React.createElement(ModelContent, null,
                        React.createElement("div", { className: "InputBox" }, Object.values(_this.props.initialValue.nodes)[Object.values(_this.props.initialValue.nodes).length - 1].type === "simple-task" ?
                            React.createElement(React.Fragment, null,
                                React.createElement(InputBox, null,
                                    React.createElement("label", null, "Name:"),
                                    React.createElement(Input, { onChange: _this.handleNameInput, value: _this.state.nodeName, type: "text" })),
                                React.createElement(InputBox, null,
                                    React.createElement("label", null, "Task Reference Name:"),
                                    React.createElement(Input, { onChange: _this.handleTaskReferenceNameInput, value: _this.state.nodeTaskReferenceName, type: "text" })),
                                React.createElement(InputBox, null,
                                    React.createElement("label", null, "Type:"),
                                    React.createElement(element_1.Select, { optionList: simpleTaskOptions, value: !!_this.state.nodeTypeOption ? _this.state.nodeTypeOption : simpleTaskOptions[0].rGuid, onChange: _this.handleNodeTypeChange })),
                                React.createElement(InputBox, null,
                                    React.createElement("label", null, "Input Parameters:"),
                                    React.createElement(Input, { onChange: _this.handleInputParametersInput, value: _this.state.nodeInputParameters, type: "text" })))
                            :
                                React.createElement(React.Fragment, null,
                                    React.createElement(InputBox, null,
                                        React.createElement("label", null, "Name:"),
                                        React.createElement(Input, { onChange: _this.handleNameInput, value: _this.state.nodeName, type: "text" })),
                                    React.createElement(InputBox, null,
                                        React.createElement("label", null, "Task Reference Name:"),
                                        React.createElement(Input, { onChange: _this.handleTaskReferenceNameInput, value: _this.state.nodeTaskReferenceName, type: "text" })),
                                    React.createElement(InputBox, null,
                                        React.createElement("label", null, "Type:"),
                                        React.createElement(element_1.Select, { optionList: systemTaskOptions, value: !!_this.state.nodeTypeOption ? _this.state.nodeTypeOption : systemTaskOptions[0].rGuid, onChange: _this.handleNodeTypeChange })),
                                    React.createElement(InputBox, null,
                                        React.createElement("label", null, "Case Value Param:"),
                                        React.createElement(Input, { onChange: _this.handleCaseValueParamInput, value: _this.state.nodeCaseValueParam, type: "text" })),
                                    React.createElement(InputBox, null,
                                        React.createElement("label", null, "Input Parameters:"),
                                        React.createElement(Input, { onChange: _this.handleInputParametersInput, value: _this.state.nodeInputParameters, type: "text" })))),
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
        _this.state = __assign(__assign({}, props.initialValue), { preNodes: Object.keys(props.initialValue.nodes), preLinks: Object.keys(props.initialValue.links), isModelShow: false, showModelName: "", nodeName: "", nodeId: "", nodeTaskReferenceName: "", nodeInputParameters: "", nodeCaseValueParam: "", nodeTypeOption: "", linkLabel: "", newNodeId: "", clickNodeId: "", newLinkId: "", clickLinkId: "", modelOption: "addNode", alertMessageInfo: "", alertMessageStatus: "init" });
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
                nodeId: "",
                nodeTaskReferenceName: "",
                nodeInputParameters: "",
                nodeCaseValueParam: ""
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
        // console.log("this state: ", this.state)
        return (React.createElement(React.Fragment, null,
            this.state.showModelName === "newNodeModel" ? this.renderAddNewNodeModel() : "",
            this.state.showModelName === "newLinkModel" ? this.renderAddNewLinkModel() : "",
            this.renderAlertMessage(),
            React.createElement(_1.FlowChart, { chart: this.state, callbacks: this.stateActions, Components: Components, config: config, isAllowAddLinkLabel: !!this.props.isAllowAddLinkLabel })));
    };
    return FlowChartWithState;
}(React.Component));
exports.FlowChartWithState = FlowChartWithState;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=FlowChartWithState.js.map