import { BunHttpServer } from "@effect/platform-bun"
import { RpcSerialization, RpcServer } from "@effect/rpc"
import { Layer } from "effect"
import { UsersLive } from "./Users/Handler.js"
import { UserRpcs } from "./Users/Rpc.js"

export const rpcHandler = RpcServer.toWebHandler(UserRpcs, {
  layer: UsersLive.pipe(
    Layer.provideMerge(RpcSerialization.layerNdjson),
    Layer.provideMerge(BunHttpServer.layerContext)
  )
})
