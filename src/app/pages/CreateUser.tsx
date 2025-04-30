import { useRxRefresh, useRxSetPromise } from "@effect-rx/rx-react"
import { Exit } from "effect"
import { useNavigate } from "react-router"
import { createUserRx, usersRx } from "../rx/users.js"

export const CreateUser = () => {
  const navigate = useNavigate()
  const createUser = useRxSetPromise(createUserRx)
  const refreshUsers = useRxRefresh(usersRx)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get("name") as string
    createUser(name).then(Exit.match({
      onFailure: (cause) => {
        console.error(cause)
        return
      },
      onSuccess: (user) => {
        refreshUsers()
        navigate(`/users/${user.id}`)
      }
    }))
  }

  return (
    <div className="p-3 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Create New User</h1>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-200"
              placeholder="Enter user name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  )
}
