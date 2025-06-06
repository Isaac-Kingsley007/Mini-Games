import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"

function App() {
  return(
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/minesweeper" element={<Minesweeper />} /> */}
    </Routes>
  )
}

export default App
