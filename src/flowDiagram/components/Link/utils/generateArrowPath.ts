import { IPosition } from '../../../'

const generateArrowPath = (startPos: IPosition, endPos: IPosition): string => {
  // console.log("----startPos: ", startPos)
  // console.log("----endPos: ", endPos)

  if (!endPos.portType) {
    return ""
  }
  if (endPos.portType === "top") {
    return `M ${endPos.x} ${endPos.y-5} L ${endPos.x - 7} ${endPos.y - 15} L ${endPos.x + 7 } ${endPos.y - 15} Z`
  }
  if (endPos.portType === "right") {
    return `M ${endPos.x} ${endPos.y-5} L ${endPos.x + 15} ${endPos.y - 7} L ${endPos.x + 15 } ${endPos.y + 7} Z`
  }
  if (endPos.portType === "bottom") {
    return `M ${endPos.x} ${endPos.y-5} L ${endPos.x - 7} ${endPos.y + 15} L ${endPos.x + 7 } ${endPos.y + 15} Z`
  }
  if (endPos.portType === "left") {
    return `M ${endPos.x} ${endPos.y-5} L ${endPos.x - 15} ${endPos.y - 7} L ${endPos.x - 15 } ${endPos.y + 7} Z`
  }

  return ""
}

export default generateArrowPath;
