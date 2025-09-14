import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  splitting: false,
  clean: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  outDir: "dist",
})
