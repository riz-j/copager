import { useContext, useState } from "react";
import { useMessageBuilder } from "hooks/useMessageBuilder";
import { SocketContext } from "contexts/SocketContext";
import { Message } from "models/Message";

const ChatBox: React.FC = () => {
  const currentUserId: string | null = localStorage.getItem('currentUserId');
  const socket = useContext(SocketContext);
  const { textMessageBuilder } = useMessageBuilder();
  
  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    if (input === "") {
      return;
    }

    if (socket) {
      const _message: Message = textMessageBuilder({
        type: "message",
        message: input,
        sender: currentUserId || "some_guest",
        room: "some_room"
      })
      
      socket.emit("on_join_lan_room", _message.room); // SUGGESTION: Maybe just have an on_join instead of a on_join_lan_room?
      socket.emit("on_message", _message);
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