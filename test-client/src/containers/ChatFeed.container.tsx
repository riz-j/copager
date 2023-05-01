import MessageBubble from "components/MessageBubble.component";
import { DataContext } from "contexts/DataContext";
import { useContext, useEffect, useRef } from "react";

const ChatFeed: React.FC = () => {
    const messages = useContext(DataContext).messages;
    
    const bottom = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (bottom.current) {

            bottom.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <>
            <div className="absolute bottom-0 pb-24 pt-5 px-4 h-full w-full overflow-y-scroll">
                { messages.map((msg, index) => {
                    const prevMsg = index > 0 ? messages[index - 1] : null;
                    const nextMsg = index < (messages.length - 1) ? messages[index + 1] : null;

                    if (prevMsg) {
                        if (prevMsg.sender !== msg.sender) {
                            return <MessageBubble key={msg._id} message={msg} startUserBlock={true} />
                        }
                    }
                    if (nextMsg) {
                        if (nextMsg.sender !== msg.sender) {
                            return <MessageBubble key={msg._id} message={msg} endUserBlock={true} />
                        }
                    }
                    return <MessageBubble key={msg._id} message={msg} />
                }) }
                <div ref={bottom} />
            </div>
        </>
    )
}

export default ChatFeed;