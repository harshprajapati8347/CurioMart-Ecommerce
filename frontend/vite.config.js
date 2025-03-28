import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
