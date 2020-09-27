import * as React from 'react'
import styled from 'styled-components'

const CustomButton = styled.button`

    &.primary {
      background-color: #ff7249;
      color: white;
      padding: 11px 32px 13px 32px;
      margin-left: 15px;
    }

    &.cancel {
      background-color: #eaeaea;
      box-shadow: none;
      color: #417fa6;
      margin-left: 40px;
    }

    &:hover {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
    }

    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.24);
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-family: inherit;
    font-size: 16px;
    font-weight: $bold;
    line-height: 19px;
    padding: 11px 24px 13px 24px;
    text-align: center;
`

export interface IButtonProps {
    children?: string
    type?: string
    onClick: (e: any) => void
}

export const Button = ({ children="button", type="primary", onClick }: IButtonProps) => {
    return (
        <CustomButton onClick={onClick} className={type}>{ children }</CustomButton>
    )
}
