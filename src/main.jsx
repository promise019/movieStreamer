
import { createRoot } from 'react-dom/client'
import './App/assets/styles/index.css'
import './App/assets/styles/reusableComponentStyles.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'


createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/movieStreamer">
    <App />
  </BrowserRouter>
)
