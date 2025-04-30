import { Link } from "react-router"

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-150"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/users"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-150"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/users/create"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-150"
                >
                  Create User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
