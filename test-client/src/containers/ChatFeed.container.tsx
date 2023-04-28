import MessageBubble from "components/MessageBubble.component";
import { SocketContext } from "contexts/SocketContext";
import { Message } from "models/Message";
import { useContext, useEffect, useState } from "react";

const ChatFeed: React.FC = () => {
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket?.on('onMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message])
            console.log(`Got message:   ${message.message}`)
        })

        return () => {
            socket?.off('onMessage');
        }
    }, [socket])
    
    return (
        <>
            <div>
                { messages.map(msg => {
                    return <MessageBubble key={msg.id_} message={msg} />
                }) }
            </div>
        </>
    )
}

export default ChatFeed;