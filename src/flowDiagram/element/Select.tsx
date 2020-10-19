import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ArrowIcon } from './Icons'

const SelectBackground = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: transparent;
`

const SelectBox = styled.div`
    width: 100%;
    position: relative;
`

const SelectHeader = styled.div`
  width: 300px;
  height: 40px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-left: 0.5rem;
  border: 1px solid #88A5BF;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;

  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px #244e74;
  }
`

const SelectValue = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #88A5BF;
`

const ArrowBox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center
  color: #88A5BF;

  &.up-arrow {
    transform: rotate( 0deg )
  }

  &.down-arrow {
    transform: rotate( 180deg )
  }

  transition: transform 200ms ease;
`

const SelectBody = styled.div`
  width: 300px;
  overflow: hidden;
  max-height: 200px;
  background: #fff;
  z-index: 101;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #88A5BF;
  position: absolute;
  top: 40px;
  overflow-y: auto;
  box-sizing: border-box;

  &.hide-body {
    display: none;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #88A5BF;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 20px;
  }
`

const SelectOption = styled.div`
  width: 300px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  padding-left: 0.5rem;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #e6f7ff;
  }
`

export interface Ioption {
    rGuid: string
    rName: string
}

export interface ISelectProps {
    optionList: Ioption[]
    value: string
    onChange: (e: string) => void
    children?: any
    style?: any
}

export const Select = ({ optionList = [], value, onChange }: ISelectProps) => {
  const [ isArrowUp, setIsArrowUp ] = useState(false)
  const [ isBodyShow, setIsBodyShow ] = useState(false)
  const [ isBgShow, setIsBgShow ] = useState(true)
  const [ selectValue, setSelectValue ] = useState(value)

  useEffect(() => {
    let selectType = optionList.filter(Type => Type.rGuid === value);
    let selectTypeName = "Select"
    if (selectType[0]!==undefined&&selectType[0].rName!==undefined) {
      selectTypeName = selectType[0].rName;
    }

    setSelectValue(selectTypeName)
  }, [ value ])

  const handleClickOption = (optionValue: string) => {
    hideSelectBody()
    onChange(optionValue)
  }

  const hideSelectBody = () => {
    setIsBodyShow(!isBodyShow)
    setIsArrowUp(false)
    setIsBodyShow(false)
    setIsBgShow(false)
  }

  const showSelectBody = () => {
    setIsBodyShow(!isBodyShow)
    setIsArrowUp(true)
    setIsBodyShow(true)
    setIsBgShow(true)
  }

  return (
    <SelectBox>
      { isBgShow ? <SelectBackground onClick={ () => { hideSelectBody() } } /> : "" }
      <SelectHeader onClick={ () => { showSelectBody() } }>
        <SelectValue>{ selectValue }</SelectValue>
        <ArrowBox className={ isArrowUp ? "up-arrow" : "down-arrow"}>
          <ArrowIcon width={14} height={14}/>
        </ArrowBox>
      </SelectHeader>
      <SelectBody className={ isBodyShow ? "" : "hide-body" }>
        {
          optionList.map(option => <SelectOption key={option.rGuid} onClick={ () => { handleClickOption(option.rGuid) } }>{option.rName}</SelectOption>)
        }
      </SelectBody>
    </SelectBox>
  )
}
