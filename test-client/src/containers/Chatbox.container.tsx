import { useState } from "react";
import { useSocket } from "hooks/useSocket";

export default function ChatBox() {
    const socket = useSocket();
    /* 
        IMPROVEMENT: declaring useSocket() will create a new WS instance 
                    each time. Consider declaring it only once in the
                    upper level (root parent component), or find another
                    possible solution like useContext.
    */
    const [input, setInput] = useState<string>("");

    const handleClick = () => {
        if (socket) {
            socket.emit("onMessage", input)
        }
    }

    return (
        <>
            <div className="flex bg-blue-100 p-10">
                <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="border-2 border-slate-500 rounded p-2"
                />
                <button onClick={handleClick}>Send</button>
            </div>
        </>
    )
}