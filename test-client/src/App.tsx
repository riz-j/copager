import './App.css'
import ChatBox from 'containers/Chatbox.container'
import __messageBuilderDemo__ from 'containers/__messageBuilderDemo__'
import __sampleLogin__ from 'containers/__sampleLogin__'

function App() {
  return (
    <>
      <div>
        <__sampleLogin__/>
        <__messageBuilderDemo__/>
        <ChatBox/>
      </div>
    </>
  )
}

export default App
