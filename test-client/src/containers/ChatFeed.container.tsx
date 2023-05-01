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
            <div className="absolute bottom-20 bg-red-100 h-full overflow-y-scroll">
                { messages.map(msg => {
                    return <MessageBubble key={msg._id} message={msg} />
                }) }
                <div ref={bottom}></div>
            </div>
        </>
    )
}

export default ChatFeed;