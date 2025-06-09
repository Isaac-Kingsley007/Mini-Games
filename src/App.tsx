import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TicTacToePage from "./games/tic-tac-toe/TicTacToePage"

function App() {
  return(
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tic-tac-toe" element={<TicTacToePage />} />
      {/*<Route path="/minesweeper" element={<Minesweeper />} /> */}
    </Routes>
  )
}

export default App
