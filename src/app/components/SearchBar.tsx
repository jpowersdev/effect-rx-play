import { useRxRefresh, useRxSet, useRxSetPromise } from "@effect-rx/rx-react"

import { Effect, Exit, Fiber, Option, Stream } from "effect"
import { useEffect, useRef } from "react"
import { resetRx, userByNameRx, usersRx } from "../rx/users.js"

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchUsers = useRxSetPromise(userByNameRx)
  const resetUsers = useRxSet(resetRx)
  const refreshUsers = useRxRefresh(usersRx)

  useEffect(() => {
    if (inputRef.current) {
      const fiber = Stream.fromEventListener<React.ChangeEvent<HTMLInputElement>>(inputRef.current, "input").pipe(
        Stream.filterMap((event) => {
          if (event.target.value.length === 0) {
            resetUsers()
            return Option.none()
          }
          return Option.some(event)
        }),
        Stream.debounce(300),
        Stream.mapEffect((event) =>
          Effect.tryPromise(() =>
            searchUsers(event.target.value).then(Exit.match({
              onFailure: (cause) => {
                console.error(cause)
              },
              onSuccess: () => {
                refreshUsers()
              }
            }))
          ).pipe(
            Effect.timeout(1000),
            Effect.ignore
          )
        ),
        Stream.runDrain,
        Effect.onInterrupt(() => Effect.log("Unmounting")),
        Effect.runFork
      )

      return () => {
        Effect.runPromise(Fiber.interrupt(fiber))
          .then(() => searchUsers(""))
      }
    }
  }, [inputRef])

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search users..."
        ref={inputRef}
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-200"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}
