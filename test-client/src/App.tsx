import './App.css';

import DashboardWrapper from 'container-wrappers/DashboardWrapper';
import Dashboard from 'pages/Dashboard.page';

function App() {
  return (
    <>
      <DashboardWrapper>
        <Dashboard/>
      </DashboardWrapper>
    </>
  )
}

export default App
