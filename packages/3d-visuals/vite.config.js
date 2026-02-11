import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'remote-3d',
            filename: 'remoteEntry.js',
            exposes: {
                './CyberBuddy': './src/components/Three/CyberBuddy.jsx',
                './Portfolio3DScene': './src/components/Three/Portfolio3DScene.jsx'
            },
            shared: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei']
        })
    ],
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false
    }
})
