import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/serve.ts"],
  clean: true,
  publicDir: true,
  treeshake: "smallest",
  external: ["@parcel/watcher"]
})
