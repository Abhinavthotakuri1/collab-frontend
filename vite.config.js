import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  define: {
    global: "globalThis",
  },

  server: {
    proxy: {
      "/api": {
        target:
          "https://collab-backend-production-8bbf.up.railway.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});