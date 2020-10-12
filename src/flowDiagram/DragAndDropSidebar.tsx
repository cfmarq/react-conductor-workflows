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

const tasks = [
  {rGuid: "task1", rName: "task1"},
  {rGuid: "task2", rName: "task2"},
  {rGuid: "task3", rName: "task3"},
  {rGuid: "task4", rName: "task4"},
]

const base = {
  offset: {
    "x": 0,
    "y": 0
  },
  selected: {},
  hovered: {},
  nodes: {
    "0": {
      "id": "0",
      "position": {
        "x": 382,
        "y": 82,
        "deltaX": 0,
        "deltaY": -1,
        "lastX": 382,
        "lastY": 83
      },
      "orientation": 0,
      "type": "simple-task",
      "ports": {
        "port1": {
          "id": "port1",
          "type": "top",
          "position": {
            "x": 100,
            "y": -2
          }
        },
        "port2": {
          "id": "port2",
          "type": "bottom",
          "position": {
            "x": 100,
            "y": 122
          }
        }
      },
      "properties": {
        "name": "task1",
        "Id": "",
        "taskReferenceName": "a",
        "inputParameters": "a",
        "caseValueParam": "",
        "defaultExclusiveJoinTask": "",
        "nodeType": ""
      },
      "size": {
        "width": 200,
        "height": 120
      }
    },
    "1": {
      "id": "1",
      "position": {
        "x": 383,
        "y": 306,
        "deltaX": 0,
        "deltaY": -1,
        "lastX": 383,
        "lastY": 307
      },
      "orientation": 0,
      "type": "system-task",
      "ports": {
        "port1": {
          "id": "port1",
          "type": "top",
          "position": {
            "x": 100,
            "y": -2
          }
        },
        "port2": {
          "id": "port2",
          "type": "bottom",
          "position": {
            "x": 100,
            "y": 122
          }
        }
      },
      "properties": {
        "name": "task2",
        "Id": "",
        "taskReferenceName": "b",
        "inputParameters": "b",
        "caseValueParam": "b",
        "defaultExclusiveJoinTask": "",
        "nodeType": "DECISION"
      },
      "size": {
        "width": 200,
        "height": 120
      }
    },
    "2": {
      "id": "2",
      "position": {
        "x": 218,
        "y": 579,
        "deltaX": -1,
        "deltaY": 2,
        "lastX": 219,
        "lastY": 577
      },
      "orientation": 0,
      "type": "simple-task",
      "ports": {
        "port1": {
          "id": "port1",
          "type": "top",
          "position": {
            "x": 100,
            "y": -2
          }
        },
        "port2": {
          "id": "port2",
          "type": "bottom",
          "position": {
            "x": 100,
            "y": 122
          }
        }
      },
      "properties": {
        "name": "task3",
        "Id": "",
        "taskReferenceName": "c",
        "inputParameters": "c",
        "caseValueParam": "",
        "defaultExclusiveJoinTask": "",
        "nodeType": "SIMPLE"
      },
      "size": {
        "width": 200,
        "height": 120
      }
    },
    "3": {
      "id": "3",
      "position": {
        "x": 579,
        "y": 580,
        "deltaX": 0,
        "deltaY": -1,
        "lastX": 579,
        "lastY": 581
      },
      "orientation": 0,
      "type": "simple-task",
      "ports": {
        "port1": {
          "id": "port1",
          "type": "top",
          "position": {
            "x": 100,
            "y": -2
          }
        },
        "port2": {
          "id": "port2",
          "type": "bottom",
          "position": {
            "x": 100,
            "y": 122
          }
        }
      },
      "properties": {
        "name": "task4",
        "Id": "",
        "taskReferenceName": "d",
        "inputParameters": "d",
        "caseValueParam": "",
        "defaultExclusiveJoinTask": "",
        "nodeType": "SIMPLE"
      },
      "size": {
        "width": 200,
        "height": 120
      }
    }
  },
  links: {
    "1c01e8e9-8808-45f0-b846-4ab1ca2e5003": {
      "id": "1c01e8e9-8808-45f0-b846-4ab1ca2e5003",
      "from": {
        "nodeId": "0",
        "portId": "port2"
      },
      "to": {
        "nodeId": "1",
        "portId": "port1"
      },
      "properties": {
        "label": "link1"
      }
    },
    "69326e43-0fcc-483e-9296-55deadf01e6d": {
      "id": "69326e43-0fcc-483e-9296-55deadf01e6d",
      "from": {
        "nodeId": "1",
        "portId": "port2"
      },
      "to": {
        "nodeId": "3",
        "portId": "port1"
      },
      "properties": {
        "label": "link3"
      }
    },
    "0b7f6c05-aa03-445b-95aa-e7b7ab976d5c": {
      "id": "0b7f6c05-aa03-445b-95aa-e7b7ab976d5c",
      "from": {
        "nodeId": "1",
        "portId": "port2"
      },
      "to": {
        "nodeId": "2",
        "portId": "port1"
      },
      "properties": {
        "label": "link2"
      }
    }
  }
}

const DragAndDropSidebar = () => (
  <Page>
    <Sidebar>
      <SidebarItem type="simple-task" ports={simpleTaskPorts} />
      <SidebarItem type="system-task" ports={simpleTaskPorts} />
    </Sidebar>
    <Content>
      <FlowChartWithState
        tasks = {tasks}
        isAllowAddLinkLabel = {true}
        initialValue={base}
        getWorkFlowChartValue={getWorkFlowChartValue}
        config={{ validateLink: validateLink, readonly: false }}
      />
    </Content>
  </Page>
)

export default DragAndDropSidebar;
