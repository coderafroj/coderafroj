import React from 'react'
import CyberBuddy from './components/Three/CyberBuddy'
import Portfolio3DScene from './components/Three/Portfolio3DScene'

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
            <h1>Remote 3D Module</h1>
            <div style={{ position: 'relative', height: '50vh', border: '1px solid #333' }}>
                <CyberBuddy />
            </div>
            <div style={{ position: 'relative', height: '50vh', border: '1px solid #333' }}>
                <Portfolio3DScene />
            </div>
        </div>
    )
}

export default App
