import { Rx } from "@effect-rx/rx-react"
import { Chunk, Effect, Option, Ref, Stream, Subscribable, SubscriptionRef } from "effect"
import type { User } from "../../Domain/User.js"
import { RpcClient } from "./rpc.js"

class Users extends Effect.Service<Users>()("Users", {
  accessors: true,
  dependencies: [RpcClient.Default],
  effect: Effect.gen(function*() {
    const client = yield* RpcClient

    const usersRef = yield* Ref.make<ReadonlyArray<User>>([])
    const searchTermRef = yield* SubscriptionRef.make<string>("")

    const findMany = Effect.fnUntraced(function*(name?: string) {
      const userStream = name
        ? Stream.fromIterableEffect(client.UserByName({ name }))
        : client.UserList({})
      yield* Ref.set(searchTermRef, name ?? "")
      const usersChunk = yield* Stream.runCollect(userStream)
      yield* Ref.set(usersRef, Chunk.toReadonlyArray(usersChunk))
      return usersChunk
    })

    // Load all users on startup
    yield* findMany()

    return {
      findMany,
      findById: (id: string) => client.UserById({ id }),
      create: (name: string) =>
        client.UserCreate({ name }).pipe(
          Effect.tap(Effect.log),
          Effect.tap(() => findMany())
        ),
      stream: Ref.get(usersRef).pipe(Stream.fromIterableEffect),
      searchTerm: Subscribable.make({
        get: Ref.get(searchTermRef),
        changes: searchTermRef.changes
      }),
      reset: () => findMany()
    } as const
  })
}) {}

const runtimeRx = Rx.runtime(Users.Default)

export const userByNameRx = runtimeRx.fn(
  Effect.fnUntraced(function*(name: string) {
    const users = yield* Users
    if (name.length === 0) {
      return Option.none()
    }
    return yield* Effect.option(users.findMany(name))
  })
)

export const searchRx = runtimeRx.subscribable(
  Users.searchTerm
).pipe(
  Rx.refreshable
)

export const resetRx = runtimeRx.fn(
  () => Users.reset()
)

export const usersRx = runtimeRx.pull(
  Stream.unwrap(Users.stream)
).pipe(
  Rx.keepAlive,
  Rx.refreshable
)

export const createUserRx = runtimeRx.fn(
  Effect.fnUntraced(function*(name: string) {
    const users = yield* Users
    return yield* users.create(name)
  })
)

export const userByIdRx = runtimeRx.fn(
  Effect.fnUntraced(function*(id: string) {
    const users = yield* Users
    return yield* users.findById(id)
  })
)
