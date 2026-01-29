import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import GlobalErrorBoundary from './components/GlobalErrorBoundary'

createRoot(document.getElementById('root')).render(
  <GlobalErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalErrorBoundary>
)
