import homepage from "./app/index.html"
import { rpcHandler } from "./RpcServer.js"

Bun.serve({
  routes: {
    "/": homepage,
    "/api/rpc": {
      async POST(req) {
        return rpcHandler.handler(req)
      }
    }
  },
  development: true
})
