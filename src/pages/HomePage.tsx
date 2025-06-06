import GameCard from "../components/GameCard";
import ticTacToe from "../assets/tic-tac-toe.png";
import minesweeper from "../assets/minesweeper.png";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-15">🎮 Mini Games</h1>
      
      <div className="flex flex-row flex-wrap space-x-20 justify-center">
        <GameCard image={ticTacToe} name="Tic Tac Toe" to="/tic-tac-toe" />
        <GameCard image={minesweeper} name="Minesweeper" to="/minesweeper" />
      </div>
    </div>
  );
}

export default HomePage;
