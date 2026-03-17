import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      // untitledui-js has no "." export; use React build
      "untitledui-js": "untitledui-js/react",
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
