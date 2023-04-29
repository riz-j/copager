import { Message } from "models/Message";

interface MessageBubbleProps {
    message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
    return (
        <>
            <div className="bg-blue-100 my-1 mx-10 py-2 px-3 rounded-xl w-1/2">
                <p>{props.message.message}</p>
                {/* <p>ID:   {props.message._id}</p> */}
                {/* <p>Type:   {props.message.type}</p> */}
                {/* <p>Message:   {props.message.message}</p>  */}
                {/* <p>Timestamp:   {props.message.timestamp}</p>  */}
                {/* <p>Sender:   {props.message.sender}</p>  */}
                {/* <p>Room:   {props.message.room}</p>  */}
            </div>
        </>
    )
}

export default MessageBubble;