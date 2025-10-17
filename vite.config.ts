import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import path from "path";

export default defineConfig({
  plugins: [react(), Pages()],
  server: {
    host: "0.0.0.0", // важно
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  preview: {
    host: true, // или 0.0.0.0
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
    allowedHosts: ["metall-it-front-6.onrender.com"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
