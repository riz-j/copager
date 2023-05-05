import MessageBubble from "components/MessageBubble.component";
import NoticeMessage from "components/NoticeMessage.component";
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
            <div className="flex flex-col bottom-0 pb-24 pt-5 px-4 h-full w-full overflow-y-scroll bg-gray-100 justify-between">
                <div>
                    <div className="flex items-center w-full mt-3">
                        <p className="text-gray-500 text-sm">
                            Messages will disappear after 24 hours
                        </p>
                    </div>
                    { messages.map((msg, index) => {
                        const prevMsg = index > 0 ? messages[index - 1] : null;
                        const nextMsg = index < (messages.length - 1) ? messages[index + 1] : null;
                        const isCurrentUser: boolean = currentUser._id === msg.sender;
                        const sender: IUser = users.find(user => user._id === msg.sender) || {} as IUser;
                        const senderDisplayName: string = sender.displayName || "unkown";
                        const senderDisplayColor: string = sender.displayColor || "#ef4444";
                        
                        if (msg.type === "text") {

                            if (!prevMsg) {
                                /** The very start of a chat */
                                return (
                                    <div className="flex flex-col items-start">
                                        <p className="mt-3 mb-1 text-sm font-medium" style={{color: senderDisplayColor}}>{senderDisplayName} {isCurrentUser ? "(Me)" : ""}</p>
                                        <MessageBubble 
                                            key={msg._id} 
                                            message={msg} 
                                            displayColor={senderDisplayColor}
                                            startUserBlock={true} 
                                        />
                                    </div>
                                )
                            }
                            if (prevMsg) {
                                if (prevMsg.sender !== msg.sender) {
                                    /** Start of a new user chat block */
                                    return (
                                        <div className="flex flex-col items-start">
                                            <p className="mt-3 mb-1 text-sm font-medium" style={{color: senderDisplayColor}}>{senderDisplayName} {isCurrentUser ? "(Me)" : ""}</p>
                                            <MessageBubble 
                                                key={msg._id} 
                                                message={msg} 
                                                displayColor={senderDisplayColor}
                                                startUserBlock={true} 
                                            />
                                        </div>
                                    )
                                }
                            }
                            if (nextMsg) {

                                if (nextMsg.sender !== msg.sender) {
                                    /** End of a user chat block */
                                    return <MessageBubble 
                                        key={msg._id} 
                                        message={msg} 
                                        endUserBlock={true} 
                                        displayColor={senderDisplayColor} 
                                    />
                                }
                            }

                            /** Middle of a user chat block */
                            return <MessageBubble 
                                key={msg._id} 
                                message={msg}
                                displayColor={senderDisplayColor}
                            />
                        }

                        if (msg.type === "user_join_notice") {
                            /** Notification for when a user enters or leaves a room */
                            return <NoticeMessage
                                key={msg._id}
                                message={msg}
                            />
                        }

                    }) }
                </div>

                <div ref={bottom} />
            </div>
        </>
    )
}

export default ChatFeed;