import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":"http://194.238.19.77:8075/"
      // "/api":"http://localhost:8075/"
    }
  }
})
