import GameCard from "../components/GameCard";
import ticTacToe from "../assets/tic-tac-toe.png";
import minesweeper from "../assets/minesweeper.png";
import HomeAppBar from "../components/HomeAppBar";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 space-y-5">
      <HomeAppBar/>
      <div className="flex flex-row flex-wrap space-x-5 justify-center">
        <GameCard image={ticTacToe} name="Tic Tac Toe" to="/tic-tac-toe" />
        <GameCard image={minesweeper} name="Minesweeper" to="/minesweeper" />
      </div>
    </div>
  );
}

export default HomePage;
