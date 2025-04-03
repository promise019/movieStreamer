
import { createRoot } from 'react-dom/client'
import './App/assets/styles/index.css'
import './App/assets/styles/reusableComponentStyles.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './App/store/store.js'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <QueryClientProvider client={queryClient}>
  <BrowserRouter basename="/movieStreamer">
    <App />
  </BrowserRouter>
  </QueryClientProvider>
</Provider>
)
