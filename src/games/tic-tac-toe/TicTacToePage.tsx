import { useState, useRef, useEffect, useMemo } from "react"
import TicTacToeGame from "./TicTacToeGame";
import TicTacToeBoard from "./components/TicTacToeBoard";
import { fetchScore, updateScore } from "./TicTacToeScoreService";
import { Link } from "react-router-dom";

function TicTacToePage() {

  const [board, setBoard] = useState<number[]>(new Array(9).fill(0));
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [draws, setDraws] = useState(0);

  const ticTacToeGame = useMemo(() => new TicTacToeGame(board, setBoard), []);

  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() =>{
    const fetchData = async () => {
      const scoreData = await fetchScore();
      setWins(scoreData.wins);
      setDraws(scoreData.draws);
      setLoses(scoreData.loses);
    }

    fetchData();
  }, []);

  useEffect(() => {

    //Game Status Updater
    if(ticTacToeGame.isWin(ticTacToeGame.board, ticTacToeGame.userValue)){
      messageRef.current!.innerHTML = "You Won!!!";
      updateScore({wins: wins + 1});
      setWins(wins + 1);
    } else if(ticTacToeGame.isWin(ticTacToeGame.board, ticTacToeGame.computerValue)){
      messageRef.current!.innerHTML = "Computer Won";
      updateScore({loses: loses + 1});
      setLoses(loses + 1);
    } else if(ticTacToeGame.isDraw()){
      messageRef.current!.innerHTML = "Draw";
      updateScore({draws: draws + 1});
      setDraws(draws + 1);
    } else{
      messageRef.current!.innerHTML = "\u00A0";
    }

    //AI Player
    if(!ticTacToeGame.isUserTurn && !ticTacToeGame.isGameOver()){
      ticTacToeGame.computerPlay();
    }

  }, [board]);

  const statusValues = {
    "Total Games":wins + loses + draws,
    "Wins":wins,
    "Loses":loses,
    "Draws":draws,
    "Score": wins * 100 + draws - loses
  };

  return (
    <div className="flex flex-col justify-between items-center w-full space-y-5">
        <div className="flex flex-row w-full p-6 items-center">
        <p className="md:text-4xl text-2xl font-bold flex-1 text-center">Tic Tac Toe</p>
        <Link to={'/tic-tac-toe/leaderboard'} className="bg-blue-300 p-3 rounded-xl">Leader Board</Link>
        </div>
        <TicTacToeBoard ticTacToeGame={ticTacToeGame}/>
        <p ref={messageRef} className="text-xl px-5 py-3"></p>
        <div className="flex flex-row justify-evenly items-center w-full">
          
          {Object.entries(statusValues).map(([key, value], index) => 
            <div className="flex flex-col items-center px-4 space-y-2" key={index}>
              <p>{key}</p>
              <p>{value}</p>
            </div>
          )}
          
        </div>
        <button onClick={() => ticTacToeGame.resetBoard()} className="text-white bg-red-400 px-6 py-3.5 rounded-2xl">Reset Game</button>
    </div>
  )
}

export default TicTacToePage