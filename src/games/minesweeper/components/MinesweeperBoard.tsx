import type MinesweeperGame from "../MinesweeperGame"
import Cell from "./Cell"

interface Props{
    minesweeperGame: MinesweeperGame
}

function MinesweeperBoard({minesweeperGame}: Props) {
    
  return (
    <div className={`bg-gray-700 p-1 grid grid-cols-${minesweeperGame.n} gap-1`}>
        {
            Array.from({length: minesweeperGame.n * minesweeperGame.n}, (_, index) => 
                <Cell num={minesweeperGame.getNumber(index)} 
                status={minesweeperGame.getStatus(index)} 
                onClick={() => minesweeperGame.click(index)}
                onRightClick={() => minesweeperGame.flag(index)}
                key={index} />
            )
        }
    </div>
  )
}

export default MinesweeperBoard