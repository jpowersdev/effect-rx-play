import { BunRuntime } from "@effect/platform-bun"
import { serve } from "bun"
import { Config, Effect } from "effect"
import App from "./app/index.html"
import { rpcHandler } from "./Rpc.js"

const program = Effect.gen(function*() {
  const config = yield* Config.all({
    port: Config.number("PORT").pipe(Config.withDefault(3000)),
    host: Config.string("HOST").pipe(Config.withDefault("0.0.0.0")),
    env: Config.string("NODE_ENV").pipe(Config.withDefault("development"))
  })

  const server = serve({
    routes: {
      "/health": Response.json({ status: "ok" }),
      "/api/rpc": {
        async POST(req) {
          return rpcHandler.handler(req)
        }
      },
      "/api/config": Response.json(config),
      "/*": App
    },
    development: config.env === "development"
  })

  yield* Effect.log(`Server is running on ${server.url}`).pipe(
    Effect.annotateLogs(config)
  )
})

BunRuntime.runMain(program)
