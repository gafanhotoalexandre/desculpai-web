import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

async function deferRender() {
  if (import.meta.env.VITE_API_MOCK !== 'true') {
    return
  }
  const { worker } = await import('./mocks/browser.ts')
  return worker.start()
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
})
