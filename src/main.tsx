import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeConfig } from './config/Theme.config'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeConfig >
        <App />
      </ThemeConfig>
    </Provider>

  </StrictMode>,
)
