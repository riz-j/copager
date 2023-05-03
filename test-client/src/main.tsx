import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from 'contexts/SocketContext.tsx'
import { DataProvider } from 'contexts/DataContext.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
