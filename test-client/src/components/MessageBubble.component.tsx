import { Message } from "models/Message";

interface MessageBubbleProps {
    message: Message
    endUserBlock?: boolean 
    startUserBlock?: boolean
    senderDisplayName?: string
    displayColor?: string
}

const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
    
    // const currentUserId: string = useContext(DataContext).currentUser._id;
    // const isCurrentUser: boolean = currentUserId === props.message.sender;
    // const alignment: string = isCurrentUser ? "justify-end" : "justify-start";
    // const textAlignment: string = isCurrentUser ? "justify-end" : "justify start";
    // const bgColor: string = isCurrentUser ? "bg-blue-600" : "bg-gray-200";
    // const textColor: string = isCurrentUser ? "text-white" : "text-black";
    // const selfBorderRadius: string = props.startUserBlock ? "rounded-l-xl rounded-tr-xl rounded-br-md" : "rounded-l-xl rounded-r-md";
    // const othersBorderRadius: string = props.startUserBlock ? "rounded-r-xl rounded-tl-xl rounded-bl-md" : "rounded-r-xl rounded-l-md";

    return (
        <>
            <div className={`flex w-full justify-start border-l-2 font-regular`} style={{borderColor: props.displayColor}}>
                <div className={`flex max-w-[90vw] px-2`}>
                    {   props.message.type === "text" &&
                            <p>{props.message.message}</p>
                    }
                    {   props.message.type === "image" &&
                            <div className="flex my-1">
                                <img src={props.message.url} className="rounded-lg" style={{minHeight: '10rem', maxHeight: '14rem'}} />
                            </div>
                    }
                    {   props.message.type === "file" &&
                            <div className="p-2 my-1 bg-gray-300 rounded-lg">
                                <div className="p-2">
                                    <p>{props.message.filename}</p>
                                </div>
                            </div>
                    }
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