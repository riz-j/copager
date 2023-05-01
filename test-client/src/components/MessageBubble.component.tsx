import { DataContext } from "contexts/DataContext";
import { Message } from "models/Message";
import { useContext } from "react";

interface MessageBubbleProps {
    message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
    const currentUserId: string = useContext(DataContext).currentUser._id;
    const isCurrentUser: boolean = currentUserId === props.message.sender;
    
    const alignment: string = isCurrentUser ? "justify-end" : "justify-start";
    const bgColor: string = isCurrentUser ? "bg-blue-300" : "bg-gray-300";

    return (
        <div className={`flex w-full ${alignment}`}>
            <div className={`my-1 mx-10 py-2 px-3 rounded-xl w-1/2 ${bgColor}`}>
                <p>{props.message.message}</p>
                {/* <p>ID:   {props.message._id}</p> */}
                {/* <p>Type:   {props.message.type}</p> */}
                {/* <p>Message:   {props.message.message}</p>  */}
                {/* <p>Timestamp:   {props.message.timestamp}</p>  */}
                {/* <p>Sender:   {props.message.sender}</p>  */}
                {/* <p>Room:   {props.message.room}</p>  */}
            </div>
        </div>
    )
}

export default MessageBubble;