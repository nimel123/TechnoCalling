import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Vite configuration
export default defineConfig({
  plugins: [react()],
  base: "./", // use './' if deploying as a static site (Netlify, etc.)
});
