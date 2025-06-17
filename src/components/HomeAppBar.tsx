import { signOut } from "../services/AuthService"

function HomeAppBar() {
  return (
    <div className="flex flex-row w-4/5 py-6 items-center ml-[20%]">
        <p className="md:text-4xl text-2xl font-bold w-3/4 text-center">Mini Games</p>
        <div className="w-1/4 flex flex-row justify-center items-center">
        <button className="px-6 py-4 pb-3 bg-red-500 rounded-2xl text-white" onClick={() => signOut()}>LOGOUT</button>
        </div>
    </div>
  )
}

export default HomeAppBar