import './App.css'
import ChatBox from 'containers/ChatBox.container'
import ChatFeed from 'containers/ChatFeed.container'
import __messageBuilderDemo__ from 'containers/__messageBuilderDemo__'
import __sampleLogin__ from 'containers/__sampleLogin__'

function App() {
  return (
    <>
      <div>
        <__sampleLogin__/>
        <ChatFeed/>
        <ChatBox/>
      </div>
    </>
  )
}

export default App
