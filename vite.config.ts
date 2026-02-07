import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves from https://<user>.github.io/<repo>/
const base = process.env.GITHUB_PAGES === 'true' ? '/trying-music/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
