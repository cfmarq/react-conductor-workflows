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
    type: 'left',
  },
  port2: {
    id: 'port2',
    type: 'right',
  }
}

const startPoint = {
  port1: {
    id: 'port1',
    type: 'left',
  },
  port2: {
    id: 'port2',
    type: 'right',
  },
  port3: {
    id: 'port3',
    type: 'top',
  },
  port4: {
    id: 'port4',
    type: 'bottom',
  },
  port5: {
    id: 'port5',
    type: 'left',
  },
  port6: {
    id: 'port6',
    type: 'right',
  },
  port7: {
    id: 'port7',
    type: 'top',
  },
  port8: {
    id: 'port8',
    type: 'bottom',
  }
};

const processQueuePoint = {
  port1: {
    id: 'port1',
    type: 'top',
  },
  port2: {
    id: 'port2',
    type: 'right',
  },
  port3: {
    id: 'port3',
    type: 'bottom',
  },
  port4: {
    id: 'port4',
    type: 'left',
  }
};

const processPoint = {
  port1: {
    id: 'port1',
    type: 'top',
  },
  port2: {
    id: 'port2',
    type: 'right',
  },
  port3: {
    id: 'port3',
    type: 'bottom',
  },
  port4: {
    id: 'port4',
    type: 'left',
  }
};

const endPoint = {
  port1: {
    id: 'port1',
    type: 'left',
  },
  port2: {
    id: 'port2',
    type: 'right',
  },
  port3: {
    id: 'port3',
    type: 'top',
  },
  port4: {
    id: 'port4',
    type: 'bottom',
  },
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
    //console.log("work-flow 的JSON数据： ", workFlowValue)
}

const validateLink = ({ linkId, fromNodeId, fromPortId, toNodeId, toPortId, chart }) => {

    if (fromNodeId === toNodeId) {
        return false
    }

    return true;
}

const DragAndDropSidebar = () => (
  <Page>
    <Sidebar>
      <SidebarItem type="simple-task" ports={simpleTaskPorts} />
    </Sidebar>
    <Content>
      <FlowChartWithState
        isAllowAddLinkLabel = {true}
        initialValue={chartSimple}
        nodeTypeOptions={nodeTypeOptions}
        getWorkFlowChartValue={getWorkFlowChartValue}
        config={{ validateLink: validateLink, readonly: false }}
      />
    </Content>
  </Page>
)

export default DragAndDropSidebar;
