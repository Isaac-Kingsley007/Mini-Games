import { useMemo, useState, useReducer, useEffect, useRef } from "react"
import MinesweeperBoard from "./components/MinesweeperBoard"
import MinesweeperGame from "./MinesweeperGame"
import { fetchScore, updateScore } from "./MinesweeperScoreService";
import { Link } from "react-router-dom";

function MinesweeperPage() {

  const [stateChange, setState] = useReducer((state) => !state, true);

  const minesweeperGame = useMemo(() => new MinesweeperGame(setState), []);

  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);

  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const scoreData = await fetchScore();
      setWins(scoreData.wins);
      setLoses(scoreData.loses);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if(minesweeperGame.isGameOver()){
      if(minesweeperGame.isWin()){
        updateScore({wins : wins + 1});
        setWins(wins + 1);
        messageRef.current!.innerHTML = "You Won!!!!";
      } else{
        updateScore({loses: loses + 1});
        setLoses(loses + 1);
        messageRef.current!.innerHTML = "Booomm! You Clicked a Mine";
      }
    } else{
      messageRef.current!.innerHTML = "";
    }
  }, [stateChange]);

  const statusValues = {
    "Total": wins + loses,
    "Wins": wins,
    "Loses": loses
  }

  return (
    <div className="flex flex-col justify-between items-center w-full space-y-5">
      <div className="flex flex-row w-full p-6 items-center">
        <p className="md:text-4xl text-2xl font-bold flex-1 text-center">Tic Tac Toe</p>
        <Link to={'/minesweeper/leaderboard'} className="bg-blue-300 p-3 rounded-xl">Leader Board</Link>
        </div>
      <MinesweeperBoard minesweeperGame={minesweeperGame}/>
      <p ref={messageRef} className="text-xl px-5 py-3"></p>
      <div className="flex flex-row justify-evenly items-center w-full">
          {Object.entries(statusValues).map(([key, value], index) => 
            <div className="flex flex-col items-center px-4 space-y-2" key={index}>
              <p>{key}</p>
              <p>{value}</p>
            </div>
          )}
      </div>
      <button onClick={() => minesweeperGame.resetGame()} className="text-white bg-red-400 px-6 py-3.5 rounded-2xl">Reset</button>
    </div>
  )
}

export default MinesweeperPage