import { Result, useRx, useRxValue } from "@effect-rx/rx-react"
import { useEffect } from "react"
import { Link } from "react-router"
import { ErrorState } from "../components/ErrorState.js"
import { LoadingState } from "../components/LoadingState.js"
import { SearchBar } from "../components/SearchBar.js"
import { searchRx, usersRx } from "../rx/users.js"

const highlight = (text: string, search: string) => {
  if (search.length === 0) {
    return text
  }
  return text.replace(new RegExp(`(${search})`, "gi"), "<span class='bg-yellow-100'>$1</span>")
}

export const UserList = () => {
  const [result, pull] = useRx(usersRx)
  const search = useRxValue(searchRx)

  useEffect(() => {
    const load = () => {
      const timeout = setTimeout(() => pull(), 500)
      return () => clearTimeout(timeout)
    }

    return Result.match(result, {
      onSuccess: (success) => {
        if (!success.waiting && !success.value.done) {
          return load()
        }
      },
      onInitial: () => {
        if (!result.waiting) {
          return load()
        }
      },
      onFailure: () => {}
    })
  }, [result])

  return (
    <div className="p-3 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Users</h1>
      <div className="mb-6">
        <SearchBar />
      </div>
      <div className="space-y-4">
        {Result.match(result, {
          onInitial: () => <LoadingState />,
          onFailure: (error) => <ErrorState cause={error.cause} />,
          onSuccess: (success) => (
            <>
              {success.value.items.length > 0 ?
                (
                  <ul className="space-y-1">
                    {success.value.items.map((item) => (
                      <li
                        key={item.id}
                        className="text-gray-700 py-1.5 border-b border-gray-100 last:border-0"
                      >
                        <Link
                          to={`/users/${item.id}`}
                          className="hover:text-indigo-600 transition-colors duration-150"
                        >
                          <span className="text-gray-500 text-sm me-2">[{item.id}]</span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlight(item.name, search._tag === "Success" ? search.value : "")
                            }}
                          />
                          {" "}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) :
                <div className="text-gray-700">No users found</div>}
              <div className="space-y-2">
                {success.waiting && !success.value.done ?
                  <div className="text-gray-400">Loading more...</div> :
                  <div className="text-gray-400 text-sm">Loaded chunk</div>}
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}
