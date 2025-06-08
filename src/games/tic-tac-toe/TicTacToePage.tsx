import { useState, useRef, useEffect } from "react"
import TicTacToeGame from "./TicTacToeGame";
import TicTacToeBoard from "./components/TicTacToeBoard";

function TicTacToePage() {

  const [board, setBoard] = useState<number[]>(new Array(9).fill(0));
  const ticTacToeGame = new TicTacToeGame(board, setBoard);

  const messageRef = useRef(null);

  let totalGames = 0;
  let wins = 0;

  useEffect(() => {
    //TODO: Define This UseEffect
  }, [board]);

  return (
    <div>
        <TicTacToeBoard ticTacToeGame={ticTacToeGame}/>
        <p ref={messageRef}></p>
        <div className="flex flex-row justify-evenly items-center">
          <div>
            <p>Total Games</p>
            <p>{totalGames}</p>
          </div>
          <div>
            <p>Wins</p>
            <p>{wins}</p>
          </div>
        </div>
    </div>
  )
}

export default TicTacToePage