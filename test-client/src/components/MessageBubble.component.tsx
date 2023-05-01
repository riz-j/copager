import { DataContext } from "contexts/DataContext";
import { Message } from "models/Message";
import { useContext } from "react";

interface MessageBubbleProps {
    message: Message
    endUserBlock?: boolean 
    startUserBlock?: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
    const currentUserId: string = useContext(DataContext).currentUser._id;
    const isCurrentUser: boolean = currentUserId === props.message.sender;
    
    const alignment: string = isCurrentUser ? "justify-end" : "justify-start";
    const textAlignment: string = isCurrentUser ? "justify-end" : "justify start";
    const bgColor: string = isCurrentUser ? "bg-blue-600" : "bg-gray-200";
    const textColor: string = isCurrentUser ? "text-white" : "text-black";
    const selfBorderRadius: string = props.startUserBlock ? "rounded-l-lg rounded-tr-lg rounded-br-sm" : "rounded-l-lg rounded-r-sm";
    const othersBorderRadius: string = props.startUserBlock ? "rounded-r-lg rounded-tl-lg rounded-bl-sm" : "rounded-r-lg rounded-l-sm";

    return (
        <>
            {/* { props.startUserBlock && <div className="h-2" />} */}
            <div className={`flex w-full ${alignment}`}>
                <div className={
                    `flex my-[0.1rem] max-w-[80vw] py-2 px-3 
                    ${props.startUserBlock && "mt-2"}
                    ${textColor} 
                    ${bgColor} 
                    ${textAlignment} 
                    ${isCurrentUser ? selfBorderRadius : othersBorderRadius}
                `}>
                    <p>{props.message.message}</p>
                    {/* <p>ID:   {props.message._id}</p> */}
                    {/* <p>Type:   {props.message.type}</p> */}
                    {/* <p>Message:   {props.message.message}</p>  */}
                    {/* <p>Timestamp:   {props.message.timestamp}</p>  */}
                    {/* <p>Sender:   {props.message.sender}</p>  */}
                    {/* <p>Room:   {props.message.room}</p>  */}
                </div>
            </div>
        </>
    )
}

export default MessageBubble;