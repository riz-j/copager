import MessageBubble from "components/MessageBubble.component";
import { DataContext } from "contexts/DataContext";
import { IUser } from "models/interfaces/IUser";
import { useContext, useEffect, useRef } from "react";

const ChatFeed: React.FC = () => {
    const messages = useContext(DataContext).messages;
    let users: IUser[] = useContext(DataContext).users;
    const currentUser: IUser = useContext(DataContext).currentUser;

    /** Check if current user is in the array of users */
    const userExists: boolean = users.some(user => user._id === currentUser._id);

    /** If user does not exist in the array of current users, append the current user */
    if (!userExists) {
        users = [...users, currentUser];
    }

    const bottom = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (bottom.current) {

            bottom.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <>
            <div className="absolute bottom-0 pb-24 pt-5 px-4 h-full w-full overflow-y-scroll bg-gray-100">
                { messages.map((msg, index) => {
                    const prevMsg = index > 0 ? messages[index - 1] : null;
                    const nextMsg = index < (messages.length - 1) ? messages[index + 1] : null;
                    const isCurrentUser: boolean = currentUser._id === msg.sender;
                    const senderDisplayName: string = users.find(user => user._id === msg.sender)?.displayName || "unkown";

                    if (prevMsg) {
                        if (prevMsg.sender !== msg.sender) {
                            /** Start of a new user chat block */
                            return (
                                <div className={`flex flex-col items-start`}>
                                    <p className="mt-3 mb-1 text-sm text-red-500">{senderDisplayName} {isCurrentUser ? "(You)" : ""}</p>
                                    <MessageBubble 
                                        key={msg._id} 
                                        message={msg} 
                                        startUserBlock={true} 
                                    />
                                </div>
                            )
                        }
                    }
                    if (nextMsg) {

                        if (nextMsg.sender !== msg.sender) {
                            /** End of a user chat block */
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