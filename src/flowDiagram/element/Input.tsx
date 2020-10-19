import * as React from 'react'
import styled from 'styled-components'

const CustomInput = styled.input`
  width: 100%;
  height: 30px;
  padding-left: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
  font-size: 14px;

  &:focus {
    border: 1px solid #88A5BF;
  }
`

export interface IInputProps {
    value: string
    type: string
    onChange: (e: any) => void
}

export const Input = ({ value, type, onChange }: IInputProps) => {
    return (
        <CustomInput value={value} type={type} onChange={onChange} />
    )
}
