import * as React from 'react'
import styled from 'styled-components'
import { IConfig, IPort } from '../../'

export interface IPortDefaultProps {
  config: IConfig
  port: IPort
  isSelected: boolean
  isHovered: boolean
  isLinkSelected: boolean
  isLinkHovered: boolean
}

const PortDefaultInner = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 20px;
  background: #88A5BF;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #88A5BF;
  }
  & svg {
    width: 15px;
    height: 15px;
  }
`

export const PortDefault = () => (
    <PortDefaultInner />
)
