import GameCard from "../components/GameCard";
import ticTacToe from "../assets/tic-tac-toe.png";
import minesweeper from "../assets/minesweeper.png";
import { signOut } from "../services/AuthService";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="flex flex-row mb-15">
      <h1 className="text-4xl font-bold text-center text-gray-800 flex-1">🎮 Mini Games</h1>
      <button className="px-6 py-4 pb-3 bg-red-500 rounded-2xl text-white" onClick={() => signOut()}>LOGOUT</button>
      </div>
      
      <div className="flex flex-row flex-wrap space-x-5 justify-center">
        <GameCard image={ticTacToe} name="Tic Tac Toe" to="/tic-tac-toe" />
        <GameCard image={minesweeper} name="Minesweeper" to="/minesweeper" />
      </div>
    </div>
  );
}

export default HomePage;
