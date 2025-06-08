import TicTacToeGame from "../TicTacToeGame";
import Cell from "./Cell";

function TicTacToeBoard({ticTacToeGame}: {ticTacToeGame: TicTacToeGame}) {

  return (
    <div className="bg-gray-700 p-1 grid grid-cols-3 gap-1">
      {
        ticTacToeGame.board.map((value, index) => (
          <Cell key = {index} value={value} onClick={() => ticTacToeGame.userPlay(index)}/>
        )
        )
      }
    </div>
  )
}

export default TicTacToeBoard