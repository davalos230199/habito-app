// /client/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // La clave '/api' significa que cualquier petición que comience con '/api'
      // será redirigida.
      '/api': {
        // El destino de la redirección: nuestro servidor backend.
        target: 'http://localhost:3001',
        // Cambia el origen de la petición al del destino.
        // Esencial para que el backend acepte la llamada.
        changeOrigin: true, 
      }
    }
  }
})