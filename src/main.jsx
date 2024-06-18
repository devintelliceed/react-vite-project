import './index.css'
import React from 'react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
)
