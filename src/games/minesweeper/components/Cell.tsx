import { Status } from "../MinesweeperGame"
import mine from "../../../assets/mine.png"
import flag from "../../../assets/flag.png"

interface Props{
    num: number,
    status: Status,
    onClick: () => void,
    onRightClick: () => void
}

const backgroundColorArray = [
    '#e8e8e8',
    '#fafafa',
    '#e8e8e8',
    '#fafafa',
    '#ff5555',
    '#ff9595'
]

function getInnerAsset(status: Status, num: number){
    const space = "\u00A0\u00A0\u00A0\u00A0\u00A0";
    switch(status){
        case Status.Hidden:
            return <span>{space}</span>
        case Status.Revealed:
            return <span>{(num == 0) ? space : num}</span>
        case Status.Flagged:
        case Status.WronglyFlagged:
            return <img src={flag} alt="Flag" className="w-5 h-5"/>
        case Status.RevealedBomb:
        case Status.ClickedBomb:
            return <img src={mine} alt="Mine" className="w-5 h-5"/>
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
    className="p-2">
        {getInnerAsset(status, num)}
    </div>
  )

}

export default Cell