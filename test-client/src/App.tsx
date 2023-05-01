import './App.css';
import ChatBox from 'containers/ChatBox.container';
import ChatFeed from 'containers/ChatFeed.container';
import DashboardWrapper from 'container-wrappers/DashboardWrapper';

import __messageBuilderDemo__ from 'containers/__messageBuilderDemo__';
import __sampleLogin__ from 'containers/__sampleLogin__';
import __userBuilderDemo__ from 'containers/__userBuilderDemo__';
import __messageDataContext from 'containers/__messageDataContext';

function App() {
  return (
    <>
      <div>
        {/* <__sampleLogin__/> */}
        {/* <__userBuilderDemo__/> */}
        {/* <__messageDataContext/> */}
        <DashboardWrapper>
          <ChatFeed/>
          <ChatBox/>
        </DashboardWrapper>
      </div>
    </>
  )
}

export default App
