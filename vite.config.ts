import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  experimental: {
    renderBuiltUrl(filename) {
      return "https://popularizers.in/alpha/" + filename;
    },
  },
});
