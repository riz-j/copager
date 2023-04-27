import './App.css';
import ChatBox from 'containers/ChatBox.container';
import ChatFeed from 'containers/ChatFeed.container';
import __messageBuilderDemo__ from 'containers/__messageBuilderDemo__';
import __sampleLogin__ from 'containers/__sampleLogin__';
import __userBuilderDemo__ from 'containers/__userBuilderDemo__';

function App() {
  return (
    <>
      <div>
        <__sampleLogin__/>
        <__userBuilderDemo__/>
        <ChatFeed/>
        <ChatBox/>
      </div>
    </>
  )
}

export default App
