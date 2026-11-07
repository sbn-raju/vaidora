import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
    //  '/api':{
    //     target:'http://194.238.19.77:8075/',
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, ''),
    //   }
    "/api": "http://localhost:8075/"
    }
  }
})
