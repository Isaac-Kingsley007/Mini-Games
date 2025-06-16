import { Routes, Route, Navigate } from "react-router-dom";
import TicTacToePage from "./games/tic-tac-toe/TicTacToePage";
import MinesweeperPage from "./games/minesweeper/MinesweeperPage";
import SigninPage from "./pages/SignInPage"; 
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { supabase } from "./services/supabaseClient";
import type { User } from "@supabase/supabase-js";
import TicTacToeLeaderBoardPage from "./games/tic-tac-toe/TicTacToeLeaderBoardPage";
import MinesweeperLeaderBoardPage from "./games/minesweeper/MinesweeperLeaderBoardPage";

function App() {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/home" replace /> : <SigninPage />} />
      <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <SignupPage />} />

      <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />

      <Route
        path="/home"
        element={user ? <HomePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/tic-tac-toe"
        element={user ? <TicTacToePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/minesweeper"
        element={user ? <MinesweeperPage /> : <Navigate to="/login" replace />}
      />
      
      <Route
        path="/tic-tac-toe/leaderboard"
        element={user ? <TicTacToeLeaderBoardPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/minesweeper/leaderboard"
        element={user ? <MinesweeperLeaderBoardPage /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
