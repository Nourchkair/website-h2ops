import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  // Ensure correct asset paths on bolt.host
  base: "/",
  build: { outDir: "dist" },
  resolve: {
    alias: [
      { find: /^@\//, replacement: fileURLToPath(new URL("./src/", import.meta.url)) },
    ],
  },
});
