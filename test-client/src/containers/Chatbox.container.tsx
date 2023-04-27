import { useState } from "react";
import { useSocket } from "hooks/useSocket";

const ChatBox: React.FC = () => {
  const socket = useSocket();
  /* 
        IMPROVEMENT: declaring useSocket() will create a new WS instance 
                    each time. Consider declaring it only once in the
                    upper level (root parent component), or find another
                    possible solution like useContext, or make useSocket
                    a singleton.
    */
  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    if (socket) {
      socket.emit("on_message", input);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      <div className="flex bg-blue-100 p-10">
        <input
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 border-slate-500 rounded p-2"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  );
}

export default ChatBox;