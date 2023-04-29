import { useContext, useState } from "react";
import { SocketContext } from "contexts/SocketContext";
import { Message } from "models/Message";
import { MessageBuilder } from "builders/MessageBuilder";

const ChatBox: React.FC = () => {
    const socket = useContext(SocketContext);
    const currentUserId: string = localStorage.getItem('currentUserId') || "not_logged_in_guy";
    const pubLanRoom: string | null = localStorage.getItem("pubLanRoom");
    
    const [input, setInput] = useState<string>("");

    const handleSendMessage = () => {
        if (input === "") {
            return;
        }

        if (socket && pubLanRoom && (pubLanRoom !== "")) {
            const _message: Message = new MessageBuilder()
                .setType("text")
                .setMessage(input)
                .setSender(currentUserId)
                .setRoom(pubLanRoom)
                .build()

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