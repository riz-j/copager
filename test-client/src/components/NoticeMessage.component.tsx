import { Message } from "models/Message";

interface NoticeMessageProps {
    message: Message
}

const NoticeMessage: React.FC<NoticeMessageProps> = (props) => {
    return (
        <>
            <div className="flex items-center w-full mt-3">
                <p className="text-gray-400 text-sm">
                    {props.message.message}
                </p>
            </div>
        </>
    )
}

export default NoticeMessage;