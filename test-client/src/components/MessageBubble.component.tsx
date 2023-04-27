import { Message } from "models/Message";

interface MessageBubbleProps {
    message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
    return (
        <>
            <div className="bg-blue-100 my-1 mx-10 py-2 px-3 rounded-xl w-1/2">
                {props.message.message}
            </div>
        </>
    )
}

export default MessageBubble;