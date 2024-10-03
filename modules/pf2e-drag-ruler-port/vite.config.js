import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "scripts/",
  publicDir: path.resolve(__dirname, "public"),
  base: "/modules/pf2e-drag-ruler-port/",
  server: {
    port: 30001,
    open: true,
    proxy: {
      "^(?!/modules/pf2e-drag-ruler-port)": "http://localhost:30000/",
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
      name: "pf2e-drag-ruler-port",
      entry: path.resolve(__dirname, "scripts/pf2e-drag-ruler-port.js"),
      formats: ["es"],
      fileName: "pf2e-drag-ruler-port",
    },
  },
});
