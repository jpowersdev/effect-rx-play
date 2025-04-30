import type { Rpc } from "@effect/rpc"
import { Effect, Layer, Stream } from "effect"
import { UserRepository } from "./Repository.js"
import { UserRpcs } from "./Rpc.js"

export const UsersLive: Layer.Layer<
  Rpc.Handler<"UserList"> | Rpc.Handler<"UserById"> | Rpc.Handler<"UserCreate">
> = UserRpcs.toLayer(
  Effect.gen(function*() {
    const db = yield* UserRepository

    return {
      UserList: () => Stream.fromIterableEffect(db.findMany),
      UserById: ({ id }) => db.findById(id),
      UserCreate: ({ name }) => db.create(name)
    }
  })
).pipe(
  // Provide the UserRepository layer
  Layer.provide(UserRepository.Default)
)
