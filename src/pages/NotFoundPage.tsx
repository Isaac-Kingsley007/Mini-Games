import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-6 bg-gray-800 text-white p-4">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-2xl">Oops! Page Was Not Found</p>
        <Link to = "/" className="p-4 rounded-xl bg-blue-400 text-white hover:bg-blue-500">
            Return Home
        </Link>
    </div>
  )
}

export default NotFoundPage