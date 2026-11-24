import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // `npm run dev:api` runs the Worker (API + local D1) on :8787.
    proxy: { "/api": "http://127.0.0.1:8787" },
  },
  build: { outDir: "dist", sourcemap: true },
});
