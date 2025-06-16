import { useEffect, useState } from 'react';
import type { LearderBoardRow } from './types';
import { fetchLeaderBoardScores, setupRealTimeLeaderBoard } from './MinesweeperScoreService';

export default function Leaderboard() {
  const [scores, setScores] = useState<LearderBoardRow[]>([]);

  const fetchLeaderBoardScoreCallback = async () => {
    const leaderBoardScores = await fetchLeaderBoardScores();
    setScores(leaderBoardScores);
  }

  useEffect(() => {
    fetchLeaderBoardScoreCallback();
    const unsubscribe = setupRealTimeLeaderBoard(fetchLeaderBoardScoreCallback);

    return () => {
        unsubscribe();
    }
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center"> MineSweeper Leaderboard</h2>
      <table className="w-full text-left border-collapse border border-gray-400">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300">Username</th>
            <th className="p-2 border border-gray-300">Wins</th>
            <th className="p-2 border border-gray-300">Loses</th>
            <th className="p-2 border border-gray-300">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-300">{player.username}</td>
              <td className="p-2 border border-gray-300">{player.wins}</td>
              <td className="p-2 border border-gray-300">{player.loses}</td>
              <td className="p-2 border border-gray-300 font-bold">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
