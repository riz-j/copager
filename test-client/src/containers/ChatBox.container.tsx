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
            {/* Insert "bg-green-100" below to debug */}
            <div className="fixed bottom-0 right-0 w-full h-20 backdrop-filter bg-white/90 backdrop-blur-lg z-20">
                <div className="flex justify-around items-center h-full w-full">
                    <input
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setInput(e.target.value)}
                        className="border-2 border-slate-500 rounded-lg p-2"
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </>
    );
}

export default ChatBox;