import * as React from 'react'
import styled from 'styled-components'
import mapValues from './container/utils/mapValues'
import { FlowChart, IChart, IConfig, IFlowChartComponents, IOnNodeDoubleClick, IOnLabelDoubleClick } from './'
import {
  onDragNode, onDragCanvas, onLinkStart, onLinkMove, onLinkComplete,
  onLinkCancel, onLinkMouseEnter, onLinkMouseLeave, onLinkClick,
  onCanvasClick, onDeleteKey, onNodeClick,
  onNodeSizeChange, onPortPositionChange, onCanvasDrop
} from './container/actions'
import { Button, Select, Message } from './element'
import { INodeDefaultProps, LinkDefault  } from './'
import { IPortDefaultProps } from './components'

import { generateLabelPosition } from './utils'

const ModelBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0,0.8);
  z-index: 99;

  &.hide {
    display: none;
  }
`

const ModelContent = styled.div`
  position: relative;
  width: 50%;
  background: #fff;
  margin: 10% auto;
  border-radius: 10px;
  padding: 0.5rem;
`

const ButtonBox =styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 1rem;
  text-align: center;
  margin-right: 40px;
  margin-bottom: 20px;
  cursor: pointer;
`

const InputBox = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 0 1rem;

  & label {
    width: 20%;
  }

  & input {
    width: 100%;
    height: 30px;
    padding-left: 0.5rem;
  }
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 100%;
`
const Label = styled.div`
  position: absolute;
  width: 120px;
`

const LabelContent = styled.div`
  padding: 5px 10px;
  background: cornflowerblue;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
`

const PortDefaultOuter = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: cornflowerblue;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: cornflowerblue;
  }
  & svg {
    width: 15px;
    height: 15px;
  }
`

const ProcessQueue = styled.div`
  width: 200px;
  height: 120px;
  position: absolute;
  padding: 30px;
  background: rgb(217, 207, 138);
  color: white;
  border-radius: 10px;
  & div {
    padding: 0px;
    margin: 0px;
  }
`

const SimpleTask = styled.div`
  width: 200px;
  height: 120px;
  position: absolute;
  padding: 30px;
  background: #417FA6;
  border-radius: 4px;
  color: white;
  & div {
    padding: 0px;
    margin: 0px;
  }
`

const SystemTask = styled.div`
  width: 200px;
  height: 120px;
  position: absolute;
  padding: 30px;
  background: rgb(155, 127, 105);
  color: white;
  & div {
    padding: 0px;
    margin: 0px;
  }
`

const StartPoint = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(148, 80, 81);
  color: white;
  border-radius: 50%;
`

const EndPoint = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(110, 97, 107);
  color: white;
  border-radius: 50%;
`

const NodeCustom = React.forwardRef(({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) => {

  switch (node.type) {
    case "start":
      return (
        <StartPoint ref={ref} {...otherProps}>
          {children}
        </StartPoint>
      )
    case "end":
      return (
        <EndPoint ref={ref} {...otherProps}>
          {children}
        </EndPoint>
      )
    case "simple-task":
      return (
        <SimpleTask ref={ref} {...otherProps}>
          {children}
        </SimpleTask>
      )
    case "process-queue":
      return (
        <ProcessQueue ref={ref} {...otherProps}>
          {children}
        </ProcessQueue>
      )
    case "system-task":
      return (
        <SystemTask ref={ref} {...otherProps}>
          {children}
        </SystemTask>
      )
    default:
      return (
        <SimpleTask ref={ref} {...otherProps}>
          {children}
        </SimpleTask>
      )
  }
})

const PortCustom = (props: IPortDefaultProps) => {
  return <PortDefaultOuter />
}

const LinkCustom = (props: any) => {
  // console.log("----props---- ", props)
  const { startPos, endPos, link, onLabelDoubleClick } = props
  const { centerX, centerY } = generateLabelPosition(startPos, endPos)
  return (
    <>
      <LinkDefault {...props} />
      <Label style={{ left: centerX, top: centerY }} onDoubleClick={ () => { onLabelDoubleClick({linkId: link.id}) } }>
         { props.link.properties && props.link.properties.label && (
           <LabelContent>{props.link.properties && props.link.properties.label}</LabelContent>
         )}
      </Label>
    </>
  )
}

export interface IFlowChartWithStateProps {
  initialValue: IChart
  Components?: IFlowChartComponents
  config?: IConfig
  getWorkFlowChartValue?: (workFlowValue: any) => void
  isAllowAddLinkLabel?: boolean
  nodeTypeOptions: any[]
  simpleTaskFields: any[]
}

let timer:any = null;


/**
 * Flow Chart With State
 */
export class FlowChartWithState extends React.Component<IFlowChartWithStateProps, IChart> {
  constructor (props: IFlowChartWithStateProps) {
    super(props)

    this.state = {
      ...props.initialValue,
      preNodes: Object.keys(props.initialValue.nodes),
      preLinks: Object.keys(props.initialValue.links),
      isModelShow: false,
      showModelName: "",
      nodeName: "",
      nodeId: "",
      nodeTaskReferenceName: "",
      nodeInputParameters: "",
      nodeCaseValueParam: "",
      nodeDefaultExclusiveJoinTask: "",
      nodeTypeOption: "",
      nodeSchema: "",
      linkLabel: "",
      newNodeId: "",
      clickNodeId: "",
      newLinkId: "",
      clickLinkId: "",
      modelOption: "addNode",
      alertMessageInfo: "",
      alertMessageStatus: "init",
    }

  }


  public state: IChart

  onNodeDoubleClick: IOnNodeDoubleClick = ({ nodeId }) => {

    let clickNodeProperties = this.state.nodes[nodeId].properties
    clickNodeProperties = !!clickNodeProperties ? clickNodeProperties : {}

    this.setState({
      modelOption: "editNode",
      showModelName: "editNodeModel",
      clickNodeId: nodeId,
      nodeName: clickNodeProperties.name,
      nodeId: clickNodeProperties.Id,
      nodeTaskReferenceName: clickNodeProperties.taskReferenceName,
      nodeInputParameters: clickNodeProperties.inputParameters,
      nodeCaseValueParam: clickNodeProperties.caseValueParam,
      nodeDefaultExclusiveJoinTask: clickNodeProperties.defaultExclusiveJoinTask,
      nodeSchema: this.state.nodes[nodeId].type,

      nodeTypeOption: !!clickNodeProperties.nodeType ? clickNodeProperties.nodeType : ""
    }, () => {
      this.setState({
        isModelShow: true
      })
    })
  }

  onLabelDoubleClick: IOnLabelDoubleClick = ({linkId}) => {
    this.setState((preState) => {
      let preLabel = !!preState.links[linkId].properties && !!preState.links[linkId].properties.label ? preState.links[linkId].properties.label: ""
      return {
        isModelShow: true,
        showModelName: "newLinkModel",
        linkLabel: preLabel,
        modelOption: "editLabel",
        clickLinkId: linkId
      }
    })
  }

  private stateActions = mapValues({
    onDragNode, onDragCanvas, onLinkStart, onLinkMove, onLinkComplete,
    onLinkCancel, onLinkMouseEnter, onLinkMouseLeave, onLinkClick,
    onCanvasClick, onDeleteKey, onNodeClick,
    onNodeSizeChange, onPortPositionChange, onCanvasDrop,
    onNodeDoubleClick: this.onNodeDoubleClick,
    onLabelDoubleClick: this.onLabelDoubleClick
  }, (func: any) => (...args: any) => this.setState(func(...args)))

  hideModel = () => {
    this.setState({
      isModelShow: false,
      nodeName: "",
      nodeId: "",
      nodeTaskReferenceName: "",
      nodeInputParameters: "",
      nodeCaseValueParam: "",
      nodeDefaultExclusiveJoinTask: "",
      linkLabel: ""
    });
  }

  handleCancelEditNode = () => {
    if (this.state.modelOption === "addNode") {
      let _newNodeId = this.state.newNodeId
      let _nodes = {}
      let _preNodes: any = []

      Object.keys(this.state.nodes).forEach(nodeId => {
        if (nodeId !== _newNodeId) {
          _nodes[nodeId] = this.state.nodes[nodeId]
        }
      })

      this.state.preNodes.forEach((preNodeId: any) => {
        if (preNodeId !== _newNodeId) {
          _preNodes.push(preNodeId);
        }
      })

      this.setState({
        newNodeId: "",
        nodes: _nodes,
        preNodes: _preNodes
      });
    }

    this.hideModel()
  }

  handleNameInput = (e: any) => {
    this.setState({
      nodeName: e.currentTarget.value
    });
  }

  handleDescriptionInput = (e: any) => {
    this.setState({
      nodeId: e.currentTarget.value
    });
  }

  handleTaskReferenceNameInput = (e: any) => {
    this.setState({
      nodeTaskReferenceName: e.currentTarget.value
    });
  }

  handleInputParametersInput = (e: any) => {
    this.setState({
      nodeInputParameters: e.currentTarget.value
    });
  }

  handleCaseValueParamInput = (e: any) => {
    this.setState({
      nodeCaseValueParam: e.currentTarget.value
    });
  }

  handleDefaultExclusiveJoinTaskInput = (e: any) => {
    this.setState({
      nodeDefaultExclusiveJoinTask: e.currentTarget.value
    });
  }

  handleLinkDescriptionInput = (e: any) => {
    this.setState({
      linkLabel: e.currentTarget.value
    });
  }

  setNodeInfo = (): boolean => {
    // console.log("nodeName: ", this.state.nodeName)
    if (this.state.nodeName.trim() === "") {
      this.warningMessage("Please input the node name!")
      return false
    }

    let _nodes = this.state.nodes;

    let _nodeId = this.state.modelOption === "addNode" ? this.state.newNodeId : this.state.clickNodeId
    _nodes[_nodeId].properties = {
      name: this.state.nodeName,
      Id: this.state.nodeId,
      taskReferenceName: this.state.nodeTaskReferenceName,
      inputParameters: this.state.nodeInputParameters,
      caseValueParam: this.state.nodeCaseValueParam,
      defaultExclusiveJoinTask: this.state.nodeDefaultExclusiveJoinTask,
      nodeType: this.state.nodeTypeOption
    }
    this.setState({
      nodes: _nodes,
      nodeSchema: _nodes[_nodeId].properties.type,
      isModelShow: false
    });
    return true
  }

  setLinkInfo = () => {
    let _links = this.state.links;
    if (this.state.modelOption === "editLabel") {
      _links[this.state.clickLinkId].properties = {
        label: this.state.linkLabel
      }
    } else if (this.state.modelOption === "addLabel") {
      _links[this.state.newLinkId].properties = {
        label: this.state.linkLabel
      }
    }

    this.setState({
      links: _links,
      isModelShow: false,
      linkLabel: ""
    });
  }

  handleNodeTypeChange = (value: string): void => {
    this.setState({
      nodeTypeOption: value
    })
  }

  renderAddNewNodeModel = (type: string) => {

    const simpleTaskOptions = [
      {
        rGuid: "SIMPLE",
        rName: "SIMPLE"
      }
    ]

    const systemTaskOptions = [
      {
        rGuid: "DECISION",
        rName: "DECISION"
      },
      {
        rGuid: "EXCLUSIVE_JOIN",
        rName: "EXCLUSIVE_JOIN"
      },
    ]
    var options;

    if(type === "simple-task") {
      options = simpleTaskOptions;
    } else {
      options = systemTaskOptions;
    }

    return (

      <>
        <ModelBox className={this.state.isModelShow ? "" : "hide"}>
          <ModelContent>
            <div className="InputBox">
              <InputBox>
                <label>Name:</label>
                <Input onChange={this.handleNameInput} value={this.state.nodeName} type="text" />
              </InputBox>
              <InputBox>
                <label>Task Reference Name:</label>
                <Input onChange={this.handleTaskReferenceNameInput} value={this.state.nodeTaskReferenceName} type="text" />
              </InputBox>
              <InputBox>
                  <label>Type:</label>
                  <Select
                    optionList={ options }
                    value={options[0].rGuid}
                    onChange={this.handleNodeTypeChange} >
                  </Select>
              </InputBox>
              {type === "simple-task" &&
              (
                <>

                  <InputBox>
                    <label>Input Parameters:</label>
                    <Input onChange={this.handleInputParametersInput} value={this.state.nodeInputParameters} type="text" />
                  </InputBox>
                </>
              )}
              {type === "system-task" &&
              (
                <>
                  { this.state.nodeTypeOption === "DECISION" &&
                  (
                    <>
                      <InputBox>
                        <label>Case Value Param:</label>
                        <Input onChange={this.handleCaseValueParamInput} value={this.state.nodeCaseValueParam} type="text" />
                      </InputBox>
                      <InputBox>
                        <label>Input Parameters:</label>
                        <Input onChange={this.handleInputParametersInput} value={this.state.nodeInputParameters} type="text" />
                      </InputBox>
                    </>
                  )}
                  { this.state.nodeTypeOption === "EXCLUSIVE_JOIN" &&
                  (
                    <InputBox>
                      <label>Default Exclusive Join Task:</label>
                      <Input onChange={this.handleDefaultExclusiveJoinTaskInput} value={this.state.nodeDefaultExclusiveJoinTask} type="text" />
                    </InputBox>

                  )}


                </>
              )}
            </div>
            <ButtonBox>
              <Button onClick={this.setNodeInfo} type="primary">Confirm</Button>
              <Button onClick={this.handleCancelEditNode} type="cancel">Cancel</Button>
            </ButtonBox>
          </ModelContent>
        </ModelBox>
      </>
    )
  }

  renderAddNewLinkModel = () => {
    if (this.props.isAllowAddLinkLabel !== true) {
      return false
    }
    return (
      <ModelBox className={this.state.isModelShow ? "" : "hide"}>
        <ModelContent>
          <div className="InputBox">
            <InputBox>
              <label>Name:</label>
              <Input onChange={this.handleLinkDescriptionInput} value={this.state.linkLabel} type="text" />
            </InputBox>
          </div>
          <ButtonBox>
            <Button onClick={this.setLinkInfo} type="primary">Confirm</Button>
            <Button onClick={this.hideModel} type="cancel">Cancel</Button>
          </ButtonBox>
        </ModelContent>
      </ModelBox>
    )
  }

  warningMessage = (content: string): void => {
    this.setState((preState) => ({
      alertMessageInfo: content,
      alertMessageStatus: "show",
    }))

    clearTimeout(timer)
    timer = setTimeout(() => {
      this.setState({
        alertMessageStatus: "hide"
      })
    }, 2000);
  }

  renderAlertMessage = () => {
    return (
      <Message errorInfo={this.state.alertMessageInfo} alertMessageStatus={this.state.alertMessageStatus} />
    )
  }

  componentDidUpdate() {

    //get work flow data
    let flowData = this.state
    delete flowData.offset.node
    for(var key of Object.keys(flowData.nodes)) {
      let node = flowData.nodes[key]

      if(node.position && node.position.node) {
        delete node.position.node
      }
    }
    // console.log("flow data: ", JSON.stringify(flowData))
    if (!!this.props.getWorkFlowChartValue) {
      this.props.getWorkFlowChartValue(flowData)
    }

    // when user add new link, he shold add the label of this link
    let addedLinkNumber = 0
    for(var linkKey in this.state.links) {
      if (!!this.state.links[linkKey].to && !!this.state.links[linkKey].to.nodeId) {
        addedLinkNumber += 1
      }
    }

    if(addedLinkNumber > this.state.preLinks.length) {
      let _preLinks = this.state.preLinks
      let _currentLinks = Object.keys(this.state.links)
      let _newLink = _currentLinks.filter(link => !_preLinks.includes(link))

      this.setState({
        isModelShow: true,
        showModelName: "newLinkModel",
        modelOption: "addLabel",
        newLinkId: _newLink[0]
      });
    }

    if(addedLinkNumber != this.state.preLinks.length) {
      this.setState((preState) => ({
          preLinks: Object.keys(preState.links)
      }))
    }

    if (Object.keys(this.state.nodes).length > this.state.preNodes.length) {
      // console.log("Add Node");
      let preNodes = this.state.preNodes;
      let currentNodes = Object.keys(this.state.nodes);
      let newNode = currentNodes.filter(node => !preNodes.includes(node))

      this.setState({
        isModelShow: true,
        showModelName: "newNodeModel",
        modelOption: "addNode",
        newNodeId: newNode[0],
        nodeName: "",
        nodeId: "",
        nodeTaskReferenceName: "",
        nodeInputParameters: "",
        nodeCaseValueParam: "",
        nodeDefaultExclusiveJoinTask: ""
      });
    }
    if (Object.keys(this.state.nodes).length != this.state.preNodes.length) {
      this.setState((preState) => ({
        preNodes: Object.keys(preState.nodes)
      }))
    }
  }

  public render () {
    const { config } = this.props

    const Components = {
      Port: PortCustom,
      Node: NodeCustom,
      Link: LinkCustom
    }

    // console.log("this state: ", this.state)

    return (
      <React.Fragment>
        { this.state.showModelName === "newNodeModel" ? this.renderAddNewNodeModel(Object.values(this.props.initialValue.nodes)[Object.values(this.props.initialValue.nodes).length - 1].type) : ""}
        { this.state.showModelName === "editNodeModel" ? this.renderAddNewNodeModel(this.state.nodeSchema) : ""}
        { this.state.showModelName === "newLinkModel" ? this.renderAddNewLinkModel() : ""}
        { this.renderAlertMessage() }
        <FlowChart
          chart={this.state}
          callbacks={this.stateActions}
          Components={ Components }
          config={config}
          isAllowAddLinkLabel={!!this.props.isAllowAddLinkLabel}
        />
      </React.Fragment>
    )
  }
}
