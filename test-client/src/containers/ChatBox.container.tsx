import { useContext, useState } from "react";
import { SocketContext } from "contexts/SocketContext";
import { Message } from "models/Message";
import { MessageBuilder } from "builders/MessageBuilder";
import send_blue from "assets/send-blue.png";
import send_gray from "assets/send-gray.png";
import upload_file from "assets/upload-file.svg"
import FileUploaderSheet from "./sheets/FileUploaderSheet.container";
import SheetWrapper from "container-wrappers/SheetWrapper";
import FileUploader from "./FileUploader.container";

const ChatBox: React.FC = () => {
    const socket = useContext(SocketContext);
    const currentUserId: string = localStorage.getItem('currentUserId') || "not_logged_in_guy";
    const pubLanRoom: string | null = localStorage.getItem("pubLanRoom");

    const [showSheet, setShowSheet] = useState<boolean>(false);
    
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
            <div className="justify-around px-1 md:px-5 w-full h-20 
                            border-t border-gray-200 backdrop-filter bg-white/80 
                            backdrop-blur-lg z-20">
                <div className="flex justify-around items-center h-full w-full">
                    <button
                        onClick={() => setShowSheet(true)}
                        className="mr-1 p-2"
                    >
                        <img 
                            src={upload_file}
                            className="w-7 h-7" 
                        />
                    </button>
                    <div className="flex flex-col w-full h-full items-center justify-around">
                        <input
                            value={input}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full border-2 rounded-full py-2 px-4 border-slate-500 
                            focus:border-blue-500 focus:outline-none"
                        />
                        {/* <p className="text-xs text-gray-400">
                            Messages will disappear after 24 hours
                        </p> */}
                    </div>
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

            {   showSheet &&
                    <SheetWrapper setShowSheet={setShowSheet}>
                        <FileUploader />
                    </SheetWrapper>
                    // <FileUploaderSheet />
            }
        </>
    );
}

export default ChatBox;