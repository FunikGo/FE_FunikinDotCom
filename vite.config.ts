import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ini yang bertugas menerjemahkan "@/" menjadi folder "src"
      "@": path.resolve(__dirname, "./src"),
    },
  },
})