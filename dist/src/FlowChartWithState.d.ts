import * as React from 'react';
import { IChart, IConfig, IFlowChartComponents, IOnNodeDoubleClick, IOnLabelDoubleClick } from './';
export interface IFlowChartWithStateProps {
    initialValue: IChart;
    Components?: IFlowChartComponents;
    config?: IConfig;
    getWorkFlowChartValue?: (workFlowValue: any) => void;
    isAllowAddLinkLabel?: boolean;
    nodeTypeOptions: any[];
    simpleTaskFields: any[];
    tasks: any[];
}
/**
 * Flow Chart With State
 */
export declare class FlowChartWithState extends React.Component<IFlowChartWithStateProps, IChart> {
    constructor(props: IFlowChartWithStateProps);
    state: IChart;
    onNodeDoubleClick: IOnNodeDoubleClick;
    onLabelDoubleClick: IOnLabelDoubleClick;
    private stateActions;
    hideModel: () => void;
    handleCancelEditNode: () => void;
    handleDescriptionInput: (e: any) => void;
    handleTaskReferenceNameInput: (e: any) => void;
    handleInputParametersInput: (e: any) => void;
    handleCaseValueParamInput: (e: any) => void;
    handleDefaultExclusiveJoinTaskInput: (e: any) => void;
    handleLinkDescriptionInput: (e: any) => void;
    setNodeInfo: () => boolean;
    setLinkInfo: () => void;
    handleNodeTypeChange: (value: string) => void;
    handleNodeNameChange: (value: string) => void;
    handleAddEnvVariable: () => void;
    handleEnvKey: (e: any, index: any) => void;
    handleEnvValue: (e: any, index: any) => void;
    removeVariable: (index: number) => void;
    renderAddNewNodeModel: (type: string, mode: string) => JSX.Element;
    renderAddNewLinkModel: () => false | JSX.Element;
    warningMessage: (content: string) => void;
    renderAlertMessage: () => JSX.Element;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
