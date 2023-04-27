import MessageBubble from "components/MessageBubble.component";
import { SocketContext } from "contexts/SocketContext";
import { Message } from "models/Message";
import { useContext, useState } from "react";

const ChatFeed: React.FC = () => {
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState<Message[]>([]);

    socket?.on('onMessage', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message])
    })

    return (
        <>
            <div>
                { messages.map(msg => {
                    return <MessageBubble message={msg} />
                }) }
            </div>
        </>
    )
}

export default ChatFeed;