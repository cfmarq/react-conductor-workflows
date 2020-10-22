/// <reference types="react" />
export interface IButtonProps {
    children?: any;
    type?: string;
    onClick: (e: any) => void;
}
export declare const Button: ({ children, type, onClick }: IButtonProps) => JSX.Element;
