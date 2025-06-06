import { Link } from "react-router-dom"

interface Props{
    image: string,
    name: string,
    to:string
}

function GameCard({image, name, to}:Props) {
  return (
    <Link to={to}>
        <div className="flex flex-col justify-between p-7 rounded-xl shadow-xl w-45 border space-y-5">
            <img src={image} alt={name} className="w-full h-30"/>
            <p className="text-lg font-bold">{name}</p>
        </div>
    </Link>
  )
}

export default GameCard