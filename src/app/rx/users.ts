import { Rx } from "@effect-rx/rx-react"
import { Effect, Stream } from "effect"
import { RpcClient, rpcRuntime } from "./rpc.js"

export const usersRx = rpcRuntime.pull(
  Effect.fnUntraced(
    function*() {
      const client = yield* RpcClient
      return client.UserList({})
    },
    Stream.unwrap
  )
).pipe(
  Rx.keepAlive,
  Rx.refreshable
)

export const createUserRx = rpcRuntime.fn(
  Effect.fnUntraced(function*(name: string) {
    const client = yield* RpcClient
    return yield* client.UserCreate({ name })
  })
)

export const userByIdRx = rpcRuntime.fn(
  Effect.fnUntraced(function*(id: string) {
    const client = yield* RpcClient
    return yield* client.UserById({ id })
  })
)
