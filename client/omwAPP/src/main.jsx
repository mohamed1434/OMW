import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js (bootstrap)
import 'react-date-range/dist/styles.css'; // main css file (for react-date-range)
import 'react-date-range/dist/theme/default.css'; // theme css file (for react-date-range)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
