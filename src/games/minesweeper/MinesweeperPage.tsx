import { useMemo, useState, useReducer, useEffect } from "react"
import MinesweeperBoard from "./components/MinesweeperBoard"
import MinesweeperGame from "./MinesweeperGame"

function MinesweeperPage() {

  const [stateChange, setState] = useReducer((state) => !state, true);

  const minesweeperGame = useMemo(() => new MinesweeperGame(setState), []);

  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);

  useEffect(() => {
    if(minesweeperGame.isGameOver()){
      if(minesweeperGame.isWin()){
        setWins(wins + 1);
      } else{
        setLoses(loses + 1);
      }
    }
  }, [stateChange]);

  const statusValues = {
    "Total": wins + loses,
    "Wins": wins,
    "Loses": loses
  }

  return (
    <div className="flex flex-col justify-between items-center w-full space-y-5">
      <p className="text-4xl font-bold p-6">Minesweeper</p>
      <MinesweeperBoard minesweeperGame={minesweeperGame}/>
      <div className="flex flex-row justify-evenly items-center w-full">
          {Object.entries(statusValues).map(([key, value], index) => 
            <div className="flex flex-col items-center px-4 space-y-2" key={index}>
              <p>{key}</p>
              <p>{value}</p>
            </div>
          )}
      </div>
      <button onClick={() => minesweeperGame.resetGame()}>Reset</button>
    </div>
  )
}

export default MinesweeperPage