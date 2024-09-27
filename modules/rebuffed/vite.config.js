import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "scripts/",
  publicDir: path.resolve(__dirname, "public"),
  base: "/modules/rebuffed/",
  server: {
    port: 30001,
    open: true,
    proxy: {
      "^(?!/modules/rebuffed)": "http://localhost:30000/",
      "/socket.io": {
        target: "ws://localhost:30000",
        ws: true,
      },
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      name: "rebuffed",
      entry: path.resolve(__dirname, "scripts/rebuffed.js"),
      formats: ["es"],
      fileName: "rebuffed",
    },
  },
});
