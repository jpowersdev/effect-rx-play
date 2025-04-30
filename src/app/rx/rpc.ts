import { Rx } from "@effect-rx/rx-react"
import { FetchHttpClient } from "@effect/platform"
import { RpcClient as Client, RpcSerialization } from "@effect/rpc"
import { Effect, Layer } from "effect"
import { UserRpcs } from "../../Users/Rpc.js"

// Choose which protocol to use
const ProtocolLive = Client.layerProtocolHttp({
  url: "/api/rpc"
}).pipe(
  Layer.provide([
    // use fetch for http requests
    FetchHttpClient.layer,
    // use ndjson for serialization
    RpcSerialization.layerNdjson
  ])
)

const Rpcs = UserRpcs

export class RpcClient extends Effect.Service<RpcClient>()("RpcClient", {
  dependencies: [ProtocolLive],
  scoped: Client.make(Rpcs)
}) {}

export const rpcRuntime = Rx.runtime(RpcClient.Default)
