import { Link } from "react-router-dom"

interface Props{
    heading: string,
    leaderBoardRoute: string,
}

function GameAppBar({heading, leaderBoardRoute}:Props) {
  return (
    <div className="flex flex-row w-4/5 py-6 items-center ml-[20%]">
        <p className="md:text-4xl text-2xl font-bold w-3/4 text-center">{heading}</p>
        <div className="w-1/4 flex flex-row justify-center items-center">
            <Link to = {leaderBoardRoute} className="bg-blue-300 p-3 rounded-xl">Leader Board</Link>
        </div>
    </div>
  )
}

export default GameAppBar