import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'coderafroj-host',
      filename: 'remoteEntry.js',
      remotes: {
        'remote-3d': 'http://localhost:5001/assets/remoteEntry.js',
      },
      exposes: {
        './Navbar': './src/components/layout/Navbar.jsx',
        './Footer': './src/components/layout/Footer.jsx',
        './GitHubContext': './src/context/GitHubContext.jsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
    })
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore', 'framer-motion', 'lucide-react', 'react-helmet-async'],
  },
  build: {
    target: 'esnext', // Required for Module Federation
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          ui: ['framer-motion', 'lucide-react', 'react-helmet-async'],
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
})
