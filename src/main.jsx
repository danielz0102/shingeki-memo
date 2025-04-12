import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Supports weights 400-900
import '@fontsource-variable/playfair-display'
import '@fontsource/cormorant-garamond'
import './styles/index.css'
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
