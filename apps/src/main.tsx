import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'
import './assets/css/common.css'
import App from './App'

AOS.init({
  easing: 'ease-out',
  duration: 200,
  offset: 100,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
