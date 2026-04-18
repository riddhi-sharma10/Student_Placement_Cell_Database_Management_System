// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true, // Allow connection from IP addresses
        strictPort: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path // Ensure we DON'T strip the /api prefix
            }
        }
    }
});
