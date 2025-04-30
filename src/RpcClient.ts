import { FetchHttpClient } from "@effect/platform"
import { RpcClient as Client, RpcSerialization } from "@effect/rpc"
import { Config, Effect, Layer } from "effect"

// Choose which protocol to use
const ProtocolLive = Client.layerProtocolHttp({
  url: "http://localhost:3000/rpc"
}).pipe(
  Layer.provide([
    // use fetch for http requests
    FetchHttpClient.layer,
    // use ndjson for serialization
    RpcSerialization.layerNdjson
  ])
)

export class RpcClient extends Effect.Service<RpcClient>()("RpcClient", {
  dependencies: [ProtocolLive],
  effect: Effect.gen(function*() {
    const port = yield* Config.number("PORT")
    return Client.make({
      url: `http://localhost:${port}/rpc`
    })
  })
}) {}
