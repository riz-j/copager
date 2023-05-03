import './App.css';
import { Routes, Route } from 'react-router-dom';

import DashboardWrapper from 'container-wrappers/DashboardWrapper';
import Dashboard from 'pages/Dashboard.page';
import LandingPage from 'pages/LandingPage.page';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <LandingPage/> } />
        <Route path='chat' element={ <DashboardWrapper><Dashboard/></DashboardWrapper> } />
      </Routes>
    </>
  )
}

export default App
