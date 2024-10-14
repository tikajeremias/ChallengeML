import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.sass'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)