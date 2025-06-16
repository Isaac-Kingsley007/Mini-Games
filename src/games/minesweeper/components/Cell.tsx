import { Status } from "../types"
import mine from "../../../assets/mine.png"
import flag from "../../../assets/flag.png"

interface Props{
    num: number,
    status: Status,
    onClick: () => void,
    onRightClick: () => void
}

const backgroundColorArray = [
    '#cfcfcf',
    '#fafafa',
    '#cfcfcf',
    '#fafafa',
    '#ff5555',
    '#ff9595',
    '#a3fca7'
]

const numberColorArray = [
    '',
    '#0000FF',
    '#008200',
    '#FE0000',
    '#000083',
    '#840000',
    '#008284',
    '#850885',
    '#757575'
]

function getInnerAsset(status: Status, num: number){
    const space = "\u00A0\u00A0\u00A0\u00A0\u00A0";
    switch(status){
        case Status.Hidden:
            return <p className="p-1">{space}</p>
        case Status.Revealed:
        case Status.RevealedAfterWinning:
            return <p className="text-center p-1" style={{color:numberColorArray[num]}}>{(num == 0) ? space : num}</p>
        case Status.Flagged:
        case Status.WronglyFlagged:
            return <img src={flag} alt="Flag" className="w-6 h-6 mt-1 ml-0.5"/>
        case Status.RevealedBomb:
        case Status.ClickedBomb:
            return <img src={mine} alt="Mine" className="w-6 h-6 mt-1 ml-0.5"/>
    }
}

function Cell({ num, status, onClick, onRightClick }: Props) {

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onRightClick();
    }

    const backgroundColor = backgroundColorArray[status];

  return (
    <div 
    onClick={onClick} 
    onContextMenu={handleRightClick} 
    style={{backgroundColor: backgroundColor}}
    className="p-1">
        {getInnerAsset(status, num)}
    </div>
  )

}

export default Cell