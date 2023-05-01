import MessageBubble from "components/MessageBubble.component";
import { DataContext } from "contexts/DataContext";
import { useContext } from "react";

const ChatFeed: React.FC = () => {
    const messages = useContext(DataContext).messages;
    
    return (
        <>
            <div className="bg-gray-100">
                { messages.map(msg => {
                    return <MessageBubble key={msg._id} message={msg} />
                }) }
            </div>
        </>
    )
}

export default ChatFeed;