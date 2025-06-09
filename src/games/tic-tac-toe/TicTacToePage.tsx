import { useState, useRef, useEffect, useMemo } from "react"
import TicTacToeGame from "./TicTacToeGame";
import TicTacToeBoard from "./components/TicTacToeBoard";

function TicTacToePage() {

  const [board, setBoard] = useState<number[]>(new Array(9).fill(0));
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [draws, setDraws] = useState(0);

  const ticTacToeGame = useMemo(() => new TicTacToeGame(board, setBoard), []);

  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {

    //Game Status Updater
    if(ticTacToeGame.isWin(ticTacToeGame.board, ticTacToeGame.userValue)){
      messageRef.current!.innerHTML = "You Won!!!";
      setWins(wins + 1);
    } else if(ticTacToeGame.isWin(ticTacToeGame.board, ticTacToeGame.computerValue)){
      messageRef.current!.innerHTML = "Computer Won";
      setLoses(loses + 1);
    } else if(ticTacToeGame.isDraw()){
      messageRef.current!.innerHTML = "Draw";
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
    "Draws":draws
  };

  return (
    <div className="flex flex-col justify-between items-center w-full space-y-5">
        <p className="text-4xl font-bold p-6">Tic Tac Toe</p>
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