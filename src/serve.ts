import homepage from "./app/index.html"

Bun.serve({
  routes: {
    "/": homepage
  }
})
