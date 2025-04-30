import { Result, useRx } from "@effect-rx/rx-react"
import { useEffect } from "react"
import { useParams } from "react-router"
import { ErrorState } from "../components/ErrorState.js"
import { LoadingState } from "../components/LoadingState.js"
import { userByIdRx } from "../rx/users.js"

export const UserView = () => {
  const { id } = useParams<{ id: string }>()
  const [result, getUserById] = useRx(userByIdRx)

  if (!id) {
    return (
      <div className="p-3 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">User Details</h1>
        <div className="text-gray-500">No id provided</div>
      </div>
    )
  }

  useEffect(() => {
    getUserById(id)
  }, [id])

  return (
    <div className="p-3 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">User Details</h1>
      {Result.match(result, {
        onInitial: () => <LoadingState />,
        onFailure: (error) => <ErrorState cause={error.cause} />,
        onSuccess: (user) => (
          <div className="bg-white rounded-lg">
            <div className="space-y-4">
              <div className="text-gray-700">
                <span className="font-medium">Name:</span> {user.value.name}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">ID:</span> {user.value.id}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
