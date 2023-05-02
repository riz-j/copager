import { useContext, useState } from "react";
import { SocketContext } from "contexts/SocketContext";
import { Message } from "models/Message";
import { MessageBuilder } from "builders/MessageBuilder";
import send_blue from "assets/send-blue.png";
import send_gray from "assets/send-gray.png";

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
            <div className="fixed justify-around px-5 bottom-0 right-0 w-full h-20 
                            border-t border-gray-200 backdrop-filter bg-white/80 
                            backdrop-blur-lg z-20">
                <div className="flex justify-around items-center h-full w-full">
                    <input
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full border-2 rounded-full py-2 px-4 border-slate-500 
                                focus:border-blue-500 focus:outline-none"
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="ml-1 p-2"
                    >
                        <img 
                            src={input ? send_blue : send_gray} 
                            className="w-6 h-6" 
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatBox;