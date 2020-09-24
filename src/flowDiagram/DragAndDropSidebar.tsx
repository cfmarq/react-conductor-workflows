import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithState } from './FlowChartWithState'
import { IPortDefaultProps } from './components'
import { Content, Page, Sidebar, SidebarItem } from './layout'
//import { chartSimple } from './exampleChartState'
import { INodeDefaultProps, LinkDefault  } from './'
import { generateLabelPosition } from './utils'

const simpleTaskPorts = {
  port1: {
    id: 'port1',
    type: 'top',
  },
  port2: {
    id: 'port2',
    type: 'bottom',
  }
}

const nodeTypeOptions = [
  {
    rGuid: "SIMPLE",
    rName: "SIMPLE"
  }
]

const chartSimple = {
    offset: {
        x: 0,
        y: 0
    },
    nodes: {
    },
    links: {
    },
    selected: {},
    hovered: {}
  }


let workFlowValue = {}

let getWorkFlowChartValue = (newWorkFlowValue) => {
    workFlowValue = newWorkFlowValue
    console.log("work-flow 的JSON数据： ", workFlowValue)
}

const validateLink = ({ linkId, fromNodeId, fromPortId, toNodeId, toPortId, chart }) => {

    if (fromNodeId === toNodeId) {
        return false
    }

    return true;
}

const simpleTaskFields = {
  name: "",
  taskReferenceName: "",
  type: ""
}

const DragAndDropSidebar = () => (
  <Page>
    <Sidebar>
      <SidebarItem type="simple-task" ports={simpleTaskPorts} />
      <SidebarItem type="system-task" ports={simpleTaskPorts} />
    </Sidebar>
    <Content>
      <FlowChartWithState
        isAllowAddLinkLabel = {true}
        initialValue={chartSimple}
        simpleTaskFields={simpleTaskFields}
        nodeTypeOptions={nodeTypeOptions}
        getWorkFlowChartValue={getWorkFlowChartValue}
        config={{ validateLink: validateLink, readonly: false }}
      />
    </Content>
  </Page>
)

export default DragAndDropSidebar;
