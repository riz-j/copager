import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SocketProvider } from 'contexts/SocketContext.tsx'
import { DataProvider } from 'contexts/DataContext.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </SocketProvider>
  </React.StrictMode>,
)
