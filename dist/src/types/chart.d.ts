import { IPosition, ISize } from './generics';
export interface IChart {
    offset: IPosition;
    nodes: {
        [id: string]: INode;
    };
    links: {
        [id: string]: ILink;
    };
    properties?: any;
    /** System Temp */
    selected: ISelectedOrHovered;
    hovered: ISelectedOrHovered;
    isModelShow: boolean;
    showModelName: string;
    nodeName: string;
    nodeTaskReferenceName: string;
    nodeCaseValueParam: string;
    nodeInputParameters: string;
    nodeDefaultExclusiveJoinTask: string;
    nodeId: string;
    nodeSchema: string;
    nodeEnvVariables: any;
    nodeTypeOption: string;
    errors: any;
    linkLabel: string;
    newNodeId: string;
    newLinkId: string;
    clickNodeId: string;
    modelOption: string;
    alertMessageInfo: string;
    alertMessageStatus: string;
    clickLinkId: string;
    preNodes: any;
    preLinks: any;
}
export interface ISelectedOrHovered {
    type?: 'link' | 'node' | 'port';
    id?: string;
}
export interface INode {
    id: string;
    type: string;
    position: IPosition;
    orientation?: number;
    ports: {
        [id: string]: IPort;
    };
    properties?: any;
    /** System Temp */
    size?: ISize;
}
export interface IPort {
    id: string;
    type: string;
    value?: string;
    properties?: any;
    /** System Temp */
    position?: IPosition;
}
export interface ILink {
    id: string;
    from: {
        nodeId: string;
        portId: string;
    };
    to: {
        nodeId?: string;
        portId?: string;
        /** System Temp */
        position?: IPosition;
    };
    properties?: any;
}
