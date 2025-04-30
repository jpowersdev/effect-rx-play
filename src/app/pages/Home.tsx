import { Link } from "react-router"

export const Home = () => {
  return (
    <div className="p-3 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to User Management
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore our user directory to view, create, and manage users in your system.
      </p>
      <div className="space-x-4">
        <Link
          to="/users"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          View Users
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <Link
          to="/users/create"
          className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-md border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Create New User
        </Link>
      </div>
    </div>
  )
}
