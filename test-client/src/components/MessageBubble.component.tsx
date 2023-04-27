import { Message } from "models/Message";

interface MessageBubbleProps {
    message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
    return (
        <>
            <div>
                <p>{props.message.message}</p>
            </div>
        </>
    )
}

export default MessageBubble;