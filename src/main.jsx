import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

let basename = import.meta.env.BASE || '/'
if (basename.endsWith('/')) basename = basename.slice(0, -1) || '/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename === '/' ? undefined : basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
